#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

function loadCalendarData() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error('❌ Calendar data file not found. Run "npm run calendar:sync" first.');
    process.exit(1);
  }

  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    team: null,
    days: 30,
    all: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      options.type = args[i + 1];
      i++;
    } else if (args[i] === '--team' && args[i + 1]) {
      options.team = args[i + 1];
      i++;
    } else if (args[i] === '--days' && args[i + 1]) {
      options.days = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--all') {
      options.all = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
📅 KCUDA Calendar List Tool

Usage: npm run calendar:list [options]

Options:
  --type <type>     Filter by event type (practice, game, tournament, track-workout)
  --team <team>     Filter by team (a-team, b-team, both)
  --days <number>   Show events for next N days (default: 30)
  --all             Show all events (past and future)
  --help, -h        Show this help message

Examples:
  npm run calendar:list
  npm run calendar:list -- --type practice --days 7
  npm run calendar:list -- --team a-team --days 14
  npm run calendar:list -- --all
  `);
}

function expandRecurringEvent(event, startDate, endDate) {
  if (!event.recurring || !event.recurring.enabled) {
    return [event];
  }

  // Simple recurring event expansion
  // This is a basic implementation - for full RRULE support, you'd want a library
  const instances = [];
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);
  const duration = eventEnd - eventStart;

  // Parse RRULE (basic support for weekly recurrence)
  const rule = event.recurring.rule;
  const freqMatch = rule.match(/FREQ=(\w+)/);
  const bydayMatch = rule.match(/BYDAY=(\w+)/);

  if (!freqMatch || freqMatch[1] !== 'WEEKLY' || !bydayMatch) {
    // Fallback: just return the original event
    return [event];
  }

  const dayMap = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const targetDay = dayMap[bydayMatch[1]];

  let current = new Date(eventStart);
  const maxDate = event.recurring.until ? new Date(event.recurring.until) : endDate;

  // Find first occurrence
  while (current.getDay() !== targetDay) {
    current.setDate(current.getDate() + 1);
  }

  while (current <= maxDate && current <= endDate) {
    if (current >= startDate) {
      const instanceEnd = new Date(current.getTime() + duration);
      instances.push({
        ...event,
        startDate: current.toISOString(),
        endDate: instanceEnd.toISOString(),
        isRecurringInstance: true
      });
    }
    current.setDate(current.getDate() + 7); // Next week
  }

  return instances;
}

function filterAndExpandEvents(events, options) {
  const now = new Date();
  const startDate = options.all ? new Date(0) : now;
  const endDate = options.all
    ? new Date('2099-12-31')
    : new Date(now.getTime() + options.days * 24 * 60 * 60 * 1000);

  let filtered = events;

  // Filter by type
  if (options.type) {
    filtered = filtered.filter(e => e.type === options.type);
  }

  // Filter by team
  if (options.team) {
    filtered = filtered.filter(e => e.team === options.team || e.team === 'both');
  }

  // Expand recurring events
  const expanded = [];
  filtered.forEach(event => {
    const instances = expandRecurringEvent(event, startDate, endDate);
    instances.forEach(instance => {
      const instanceStart = new Date(instance.startDate);
      if (instanceStart >= startDate && instanceStart <= endDate) {
        expanded.push(instance);
      }
    });
  });

  // Sort by start date
  expanded.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return expanded;
}

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York'
  };
  return date.toLocaleString('en-US', options);
}

function getTypeEmoji(type, eventTypes) {
  return eventTypes[type]?.icon || '📅';
}

function displayEvents(events, calendarData) {
  if (events.length === 0) {
    console.log('\n📭 No events found matching your criteria.\n');
    return;
  }

  console.log(`\n📅 Found ${events.length} event(s):\n`);
  console.log('─'.repeat(80));

  events.forEach((event, index) => {
    const emoji = getTypeEmoji(event.type, calendarData.eventTypes);
    const typeLabel = calendarData.eventTypes[event.type]?.label || event.type;
    const teamLabel = calendarData.teams[event.team]?.shortName || event.team;

    console.log(`${emoji}  ${event.title}`);
    console.log(`   ${formatEventDate(event.startDate)}`);
    console.log(`   ${typeLabel} • ${teamLabel}${event.location ? ` • ${event.location}` : ''}`);

    if (event.status === 'cancelled') {
      console.log('   ⚠️  CANCELLED');
    }

    if (event.isRecurringInstance) {
      console.log('   🔁 Recurring event');
    }

    if (index < events.length - 1) {
      console.log('─'.repeat(80));
    }
  });

  console.log('─'.repeat(80));
  console.log('');
}

async function main() {
  const options = parseArgs();

  try {
    console.log('📂 Loading calendar data...');
    const calendarData = loadCalendarData();
    console.log(`   Last sync: ${calendarData.lastSync || 'Never'}`);

    console.log('🔍 Filtering events...');
    if (options.type) console.log(`   Type: ${options.type}`);
    if (options.team) console.log(`   Team: ${options.team}`);
    if (!options.all) console.log(`   Days: ${options.days}`);

    const filtered = filterAndExpandEvents(calendarData.events, options);
    displayEvents(filtered, calendarData);

  } catch (error) {
    console.error('❌ Error listing calendar:', error.message);
    process.exit(1);
  }
}

main();
