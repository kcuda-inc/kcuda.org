#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const ICAL = require('ical.js');

const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/f084ad195358602b56dafa6db63eeaf1914b7f43b4cd7ee8d080f29f218dd378%40group.calendar.google.com/public/basic.ics';
const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

// Event type keywords for classification
const TYPE_KEYWORDS = {
  practice: ['practice', 'training'],
  game: ['game', 'match', 'vs', 'league'],
  tournament: ['tournament', 'tourney', 'hat'],
  'track-workout': ['track', 'workout', 'conditioning', 'speed']
};

// Team keywords for classification
const TEAM_KEYWORDS = {
  'a-team': ['a team', 'varsity', 'a-team'],
  'b-team': ['b team', 'jv', 'b-team', 'junior varsity'],
  'both': ['both', 'all teams', 'combined']
};

function fetchICalData() {
  return new Promise((resolve, reject) => {
    https.get(CALENDAR_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function classifyEventType(summary, description) {
  const text = `${summary} ${description}`.toLowerCase();

  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return type;
    }
  }

  // Default classification based on day of week
  const dayMatch = text.match(/(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);
  if (dayMatch) {
    const day = dayMatch[0].toLowerCase();
    if (day === 'monday') return 'track-workout';
    if (['tuesday', 'thursday', 'saturday'].includes(day)) return 'practice';
  }

  return 'practice'; // default
}

function classifyTeam(summary, description) {
  const text = `${summary} ${description}`.toLowerCase();

  for (const [team, keywords] of Object.entries(TEAM_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return team;
    }
  }

  return 'both'; // default to both teams
}

function parseRecurringRule(rrule) {
  if (!rrule) return { enabled: false };

  try {
    const rule = rrule.toString();
    const untilMatch = rule.match(/UNTIL=([^;]+)/);
    const freqMatch = rule.match(/FREQ=([^;]+)/);
    const bydayMatch = rule.match(/BYDAY=([^;]+)/);

    return {
      enabled: true,
      rule: rule.replace(/^RRULE:/, ''),
      until: untilMatch ? untilMatch[1] : null,
      freq: freqMatch ? freqMatch[1] : null,
      byday: bydayMatch ? bydayMatch[1] : null
    };
  } catch (error) {
    console.error('Error parsing RRULE:', error);
    return { enabled: false };
  }
}

function parseICalEvents(icalData) {
  const jcalData = ICAL.parse(icalData);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  const events = [];

  // Only include events from November 2025 onwards
  const cutoffDate = new Date('2025-11-01T00:00:00Z');

  for (const vevent of vevents) {
    const event = new ICAL.Event(vevent);

    const summary = event.summary || 'Untitled Event';
    const description = event.description || '';
    const location = event.location || '';
    const uid = event.uid || `event-${Date.now()}-${Math.random()}`;

    // Get start and end times
    const startDate = event.startDate.toJSDate();
    const endDate = event.endDate.toJSDate();
    const isAllDay = !event.startDate.isDate &&
                     startDate.getHours() === 0 &&
                     startDate.getMinutes() === 0 &&
                     (endDate - startDate) >= 86400000;

    // Skip events older than November 2025
    if (startDate < cutoffDate) {
      continue;
    }

    // Parse recurring rule if present
    const rruleProp = vevent.getFirstProperty('rrule');
    const recurring = parseRecurringRule(rruleProp ? rruleProp.getFirstValue() : null);

    // Classify event type and team
    const type = classifyEventType(summary, description);
    const team = classifyTeam(summary, description);

    // Format dates
    const formatDate = (date) => {
      return date.toISOString();
    };

    events.push({
      id: `google-${uid.substring(0, 16)}`,
      uid: uid,
      title: summary,
      description: description,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      allDay: isAllDay,
      location: location,
      type: type,
      team: team,
      recurring: recurring,
      source: 'google-calendar',
      status: 'confirmed'
    });
  }

  return events;
}

function loadExistingData() {
  if (!fs.existsSync(DATA_FILE)) {
    return {
      version: '1.0',
      lastSync: null,
      calendarSource: CALENDAR_URL,
      events: [],
      eventTypes: {
        practice: { label: 'Practice', color: '#4F46E5', icon: '🥏' },
        game: { label: 'Game', color: '#DC2626', icon: '⚡' },
        tournament: { label: 'Tournament', color: '#7C3AED', icon: '🏆' },
        'track-workout': { label: 'Track Workout', color: '#059669', icon: '🏃' }
      },
      teams: {
        'a-team': { label: 'A Team (Varsity)', shortName: 'A Team' },
        'b-team': { label: 'B Team (JV)', shortName: 'B Team' },
        both: { label: 'Both Teams', shortName: 'All' }
      }
    };
  }

  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function mergeEvents(existing, googleEvents) {
  // Keep local-only events
  const localEvents = existing.events.filter(e => e.source === 'local');

  // Create a map of existing Google events by UID
  const existingGoogleByUID = {};
  existing.events.filter(e => e.source === 'google-calendar').forEach(e => {
    existingGoogleByUID[e.uid] = e;
  });

  // Track changes
  const changes = {
    added: 0,
    updated: 0,
    removed: 0,
    unchanged: 0
  };

  // Process Google Calendar events
  const processedUIDs = new Set();
  googleEvents.forEach(googleEvent => {
    processedUIDs.add(googleEvent.uid);

    const existingEvent = existingGoogleByUID[googleEvent.uid];
    if (!existingEvent) {
      // New event
      localEvents.push(googleEvent);
      changes.added++;
    } else if (JSON.stringify(existingEvent) !== JSON.stringify(googleEvent)) {
      // Updated event (unless override flag is set)
      if (!existingEvent.override) {
        localEvents.push(googleEvent);
        changes.updated++;
      } else {
        localEvents.push(existingEvent);
        changes.unchanged++;
        console.log(`⚠️  Preserving local override for: ${existingEvent.title}`);
      }
    } else {
      // Unchanged event
      localEvents.push(existingEvent);
      changes.unchanged++;
    }
  });

  // Check for removed events
  Object.keys(existingGoogleByUID).forEach(uid => {
    if (!processedUIDs.has(uid)) {
      changes.removed++;
    }
  });

  return { events: localEvents, changes };
}

async function main() {
  try {
    console.log('🔄 Fetching Google Calendar data...');
    const icalData = await fetchICalData();

    console.log('📅 Parsing iCal events...');
    const googleEvents = parseICalEvents(icalData);
    console.log(`   Found ${googleEvents.length} events in Google Calendar`);

    console.log('📂 Loading existing local data...');
    const existingData = loadExistingData();

    console.log('🔀 Merging events...');
    const { events, changes } = mergeEvents(existingData, googleEvents);

    // Update data structure
    existingData.events = events;
    existingData.lastSync = new Date().toISOString();

    // Write to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');

    console.log('\n✅ Sync complete!');
    console.log(`   Added:     ${changes.added}`);
    console.log(`   Updated:   ${changes.updated}`);
    console.log(`   Removed:   ${changes.removed}`);
    console.log(`   Unchanged: ${changes.unchanged}`);
    console.log(`   Total:     ${events.length} events\n`);
    console.log(`💾 Data saved to: ${DATA_FILE}`);

  } catch (error) {
    console.error('❌ Error syncing calendar:', error.message);
    process.exit(1);
  }
}

main();
