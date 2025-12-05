#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

// Load existing calendar data
const calendarData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Tournament events for 2026
const tournamentEvents = [
  // March 8 - Battle of the Hudson (Warmup)
  {
    id: 'local-tournament-battle-hudson-2026',
    uid: 'local-tournament-battle-hudson-2026',
    title: '🏆 Battle of the Hudson',
    description: 'Warmup tournament in Red Hook, Brooklyn',
    startDate: '2026-03-08T13:00:00.000Z', // 8am EST
    endDate: '2026-03-08T21:00:00.000Z',
    allDay: false,
    location: 'Red Hook, Brooklyn, NY',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // March 28 - NYC Kick Off (tentative based on brackets)
  {
    id: 'local-tournament-nyc-kickoff-2026',
    uid: 'local-tournament-nyc-kickoff-2026',
    title: '🏆 NYC Kick Off',
    description: 'NYC Kick Off tournament',
    startDate: '2026-03-28T13:00:00.000Z',
    endDate: '2026-03-28T21:00:00.000Z',
    allDay: false,
    location: 'Van Cortlandt Park, Bronx, NY',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // April 18-19 - Spring Fling
  {
    id: 'local-tournament-spring-fling-day1-2026',
    uid: 'local-tournament-spring-fling-day1-2026',
    title: '🏆 Spring Fling - Day 1',
    description: 'Spring Fling tournament in Freehold, NJ',
    startDate: '2026-04-18T13:00:00.000Z',
    endDate: '2026-04-18T21:00:00.000Z',
    allDay: false,
    location: 'Freehold, NJ',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-tournament-spring-fling-day2-2026',
    uid: 'local-tournament-spring-fling-day2-2026',
    title: '🏆 Spring Fling - Day 2',
    description: 'Spring Fling tournament in Freehold, NJ',
    startDate: '2026-04-19T13:00:00.000Z',
    endDate: '2026-04-19T21:00:00.000Z',
    allDay: false,
    location: 'Freehold, NJ',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // May 2-3 - Amherst Invite
  {
    id: 'local-tournament-amherst-day1-2026',
    uid: 'local-tournament-amherst-day1-2026',
    title: '🏆 Amherst Invite - Day 1',
    description: 'Amherst Invite tournament',
    startDate: '2026-05-02T13:00:00.000Z',
    endDate: '2026-05-02T21:00:00.000Z',
    allDay: false,
    location: 'Amherst, MA',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-tournament-amherst-day2-2026',
    uid: 'local-tournament-amherst-day2-2026',
    title: '🏆 Amherst Invite - Day 2',
    description: 'Amherst Invite tournament',
    startDate: '2026-05-03T13:00:00.000Z',
    endDate: '2026-05-03T21:00:00.000Z',
    allDay: false,
    location: 'Amherst, MA',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // May 10 - City Championships
  {
    id: 'local-tournament-city-championships-2026',
    uid: 'local-tournament-city-championships-2026',
    title: '🏆 City Championships',
    description: 'NYC City Championships',
    startDate: '2026-05-10T13:00:00.000Z',
    endDate: '2026-05-10T21:00:00.000Z',
    allDay: false,
    location: 'Van Cortlandt Park, Bronx, NY',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // May 16-17 - PVI
  {
    id: 'local-tournament-pvi-day1-2026',
    uid: 'local-tournament-pvi-day1-2026',
    title: '🏆 PVI - Day 1',
    description: 'PVI tournament in Easthampton',
    startDate: '2026-05-16T13:00:00.000Z',
    endDate: '2026-05-16T21:00:00.000Z',
    allDay: false,
    location: 'Easthampton, MA',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-tournament-pvi-day2-2026',
    uid: 'local-tournament-pvi-day2-2026',
    title: '🏆 PVI - Day 2',
    description: 'PVI tournament in Easthampton',
    startDate: '2026-05-17T13:00:00.000Z',
    endDate: '2026-05-17T21:00:00.000Z',
    allDay: false,
    location: 'Easthampton, MA',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // May 23-24 - NY State Championship
  {
    id: 'local-tournament-ny-state-day1-2026',
    uid: 'local-tournament-ny-state-day1-2026',
    title: '🏆 NY State Championship - Day 1',
    description: 'New York State Championship',
    startDate: '2026-05-23T13:00:00.000Z',
    endDate: '2026-05-23T21:00:00.000Z',
    allDay: false,
    location: 'Albany, NY',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-tournament-ny-state-day2-2026',
    uid: 'local-tournament-ny-state-day2-2026',
    title: '🏆 NY State Championship - Day 2',
    description: 'New York State Championship',
    startDate: '2026-05-24T13:00:00.000Z',
    endDate: '2026-05-24T21:00:00.000Z',
    allDay: false,
    location: 'Albany, NY',
    type: 'tournament',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  }
];

// Add new events to calendar data
let added = 0;
tournamentEvents.forEach(event => {
  const exists = calendarData.events.some(e => e.id === event.id);
  if (!exists) {
    calendarData.events.push(event);
    console.log(`✅ Added: ${event.title} - ${new Date(event.startDate).toLocaleDateString()}`);
    added++;
  } else {
    console.log(`⚠️  Skipped (exists): ${event.title}`);
  }
});

// Sort events by date
calendarData.events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

// Save updated calendar
fs.writeFileSync(DATA_FILE, JSON.stringify(calendarData, null, 2), 'utf8');

console.log(`\n✅ Tournament schedule added! Added ${added} events. Total: ${calendarData.events.length}`);
console.log('\n🏆 2026 Tournament Schedule:');
console.log('   Mar 8:    Battle of the Hudson (Brooklyn)');
console.log('   Mar 21-22: YULA (Arlington, VA) - Already in calendar');
console.log('   Mar 28:   NYC Kick Off (Van Cortlandt Park)');
console.log('   Apr 18-19: Spring Fling (Freehold, NJ)');
console.log('   May 2-3:  Amherst Invite (Amherst, MA)');
console.log('   May 10:   City Championships (Van Cortlandt Park)');
console.log('   May 16-17: PVI (Easthampton, MA)');
console.log('   May 23-24: NY State Championship (Albany, NY)');
console.log('\nNext steps:');
console.log('1. Run "npm run calendar:export" to create calendar.ics file');
console.log('2. Import calendar.ics into Google Calendar\n');
