#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

// Load existing calendar data
const calendarData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Winter schedule events
const winterEvents = [
  // December Track Workouts (Mondays - All players)
  {
    id: 'local-track-2025-12-09',
    uid: 'local-track-workout-2025-12-09',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2025-12-09T22:00:00.000Z', // 5pm EST
    endDate: '2025-12-09T23:15:00.000Z',   // 6:15pm EST
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-track-2025-12-16',
    uid: 'local-track-workout-2025-12-16',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2025-12-16T22:00:00.000Z',
    endDate: '2025-12-16T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // December Tuesday Practices (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-10',
    uid: 'local-practice-2025-12-10',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-10T21:30:00.000Z', // 4:30pm EST
    endDate: '2025-12-10T23:30:00.000Z',   // 6:30pm EST
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2025-12-17',
    uid: 'local-practice-2025-12-17',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-17T21:30:00.000Z',
    endDate: '2025-12-17T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // December Thursday Practices (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-12',
    uid: 'local-practice-2025-12-12',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-12T21:30:00.000Z',
    endDate: '2025-12-12T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // December Saturday Practice (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-14',
    uid: 'local-practice-2025-12-14',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-14T19:00:00.000Z', // 2pm EST
    endDate: '2025-12-14T21:30:00.000Z',   // 4:30pm EST
    allDay: false,
    location: 'Prospect Park Parade Grounds Field 8, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // January Resume Dates
  {
    id: 'local-practice-2026-01-06',
    uid: 'local-practice-2026-01-06',
    title: '🥏 A Team + Winter Squad Practice Resumes',
    description: 'First practice after holiday break for A Team and Winter Squad',
    startDate: '2026-01-06T22:00:00.000Z', // 5pm EST (Monday)
    endDate: '2026-01-06T23:15:00.000Z',
    allDay: false,
    location: 'TBD',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-27',
    uid: 'local-practice-2026-01-27',
    title: '🥏 B Team Practice Resumes',
    description: 'First practice after holiday break for B Team and new players',
    startDate: '2026-01-27T21:30:00.000Z', // 4:30pm EST (Monday)
    endDate: '2026-01-27T23:30:00.000Z',
    allDay: false,
    location: 'TBD',
    type: 'practice',
    team: 'b-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  }
];

// Add events to calendar data
winterEvents.forEach(event => {
  // Check if event already exists
  const exists = calendarData.events.some(e => e.id === event.id);
  if (!exists) {
    calendarData.events.push(event);
    console.log(`✅ Added: ${event.title} - ${event.startDate}`);
  } else {
    console.log(`⚠️  Skipped (exists): ${event.title}`);
  }
});

// Sort events by date
calendarData.events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

// Save updated calendar
fs.writeFileSync(DATA_FILE, JSON.stringify(calendarData, null, 2), 'utf8');

console.log(`\n✅ Winter schedule added! Total events: ${calendarData.events.length}`);
console.log('\nNext steps:');
console.log('1. Run "npm run calendar:export" to create calendar.ics file');
console.log('2. Import calendar.ics into Google Calendar');
console.log('3. Run "npm run calendar:sync" to sync back from Google Calendar\n');
