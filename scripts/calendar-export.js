#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ICAL = require('ical.js');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'calendar.ics');

function loadCalendarData() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error('❌ Calendar data file not found. Run "npm run calendar:sync" first.');
    process.exit(1);
  }

  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function formatDateToICAL(dateString) {
  const date = new Date(dateString);
  return ICAL.Time.fromJSDate(date, true);
}

function generateICS(calendarData) {
  // Create calendar component
  const cal = new ICAL.Component(['vcalendar', [], []]);
  cal.updatePropertyWithValue('prodid', '-//KCUDA//Calendar Export//EN');
  cal.updatePropertyWithValue('version', '2.0');
  cal.updatePropertyWithValue('calscale', 'GREGORIAN');
  cal.updatePropertyWithValue('method', 'PUBLISH');
  cal.updatePropertyWithValue('x-wr-calname', 'KCUDA Schedule');
  cal.updatePropertyWithValue('x-wr-timezone', 'America/New_York');
  cal.updatePropertyWithValue('x-wr-caldesc', 'KCUDA practices, games, tournaments, and workouts');

  // Filter to only local events (not already in Google Calendar)
  const localEvents = calendarData.events.filter(e => e.source === 'local');

  if (localEvents.length === 0) {
    console.log('ℹ️  No local events to export (all events are from Google Calendar)');
    return null;
  }

  console.log(`📤 Exporting ${localEvents.length} local event(s)...`);

  localEvents.forEach(event => {
    const vevent = new ICAL.Component('vevent');

    // Required properties
    vevent.updatePropertyWithValue('uid', event.uid || event.id);
    vevent.updatePropertyWithValue('summary', event.title);
    vevent.updatePropertyWithValue('dtstamp', formatDateToICAL(new Date().toISOString()));
    vevent.updatePropertyWithValue('dtstart', formatDateToICAL(event.startDate));
    vevent.updatePropertyWithValue('dtend', formatDateToICAL(event.endDate));

    // Optional properties
    if (event.description) {
      vevent.updatePropertyWithValue('description', event.description);
    }

    if (event.location) {
      vevent.updatePropertyWithValue('location', event.location);
    }

    vevent.updatePropertyWithValue('status', event.status.toUpperCase());

    // Add team and type as categories
    const categories = [];
    if (event.team) {
      const teamLabel = calendarData.teams[event.team]?.label || event.team;
      categories.push(teamLabel);
    }
    if (event.type) {
      const typeLabel = calendarData.eventTypes[event.type]?.label || event.type;
      categories.push(typeLabel);
    }
    if (categories.length > 0) {
      vevent.updatePropertyWithValue('categories', categories.join(','));
    }

    // Add recurring rule if present
    if (event.recurring && event.recurring.enabled) {
      try {
        const rrule = ICAL.Recur.fromString(event.recurring.rule);
        vevent.updatePropertyWithValue('rrule', rrule);
      } catch (error) {
        console.warn(`⚠️  Could not parse RRULE for event "${event.title}":`, error.message);
      }
    }

    cal.addSubcomponent(vevent);
  });

  return cal.toString();
}

async function main() {
  try {
    console.log('📂 Loading calendar data...');
    const calendarData = loadCalendarData();

    console.log('🔨 Generating iCalendar file...');
    const icsContent = generateICS(calendarData);

    if (!icsContent) {
      console.log('\n✅ Export complete (no local events to export)');
      return;
    }

    fs.writeFileSync(OUTPUT_FILE, icsContent, 'utf8');

    console.log('\n✅ Export complete!');
    console.log(`💾 iCalendar file saved to: ${OUTPUT_FILE}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Go to Google Calendar (https://calendar.google.com)');
    console.log('   2. Click the gear icon → Settings');
    console.log('   3. Click "Import & export" in the left sidebar');
    console.log('   4. Click "Import" and select the calendar.ics file');
    console.log('   5. Select the KCUDA calendar as the destination');
    console.log('   6. Run "npm run calendar:sync" to pull the events back with Google Calendar UIDs\n');

  } catch (error) {
    console.error('❌ Error exporting calendar:', error.message);
    process.exit(1);
  }
}

main();
