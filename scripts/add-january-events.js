#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

// Load existing calendar data
const calendarData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// January 2026 schedule events
const januaryEvents = [
  // MONDAYS - Track Workouts (All players) - Full month
  {
    id: 'local-track-2026-01-05',
    uid: 'local-track-workout-2026-01-05',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2026-01-05T22:00:00.000Z', // 5pm EST
    endDate: '2026-01-05T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-track-2026-01-12',
    uid: 'local-track-workout-2026-01-12',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2026-01-12T22:00:00.000Z',
    endDate: '2026-01-12T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-track-2026-01-19',
    uid: 'local-track-workout-2026-01-19',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2026-01-19T22:00:00.000Z',
    endDate: '2026-01-19T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-track-2026-01-26',
    uid: 'local-track-workout-2026-01-26',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2026-01-26T22:00:00.000Z',
    endDate: '2026-01-26T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // TUESDAYS - A Team (Jan 6-24), then both teams (Jan 27+)
  {
    id: 'local-practice-2026-01-13',
    uid: 'local-practice-2026-01-13',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad',
    startDate: '2026-01-13T21:30:00.000Z',
    endDate: '2026-01-13T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-20',
    uid: 'local-practice-2026-01-20',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad',
    startDate: '2026-01-20T21:30:00.000Z',
    endDate: '2026-01-20T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // THURSDAYS - A Team (Jan 8-22), then both teams (Jan 29+)
  {
    id: 'local-practice-2026-01-08',
    uid: 'local-practice-2026-01-08',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad',
    startDate: '2026-01-08T21:30:00.000Z',
    endDate: '2026-01-08T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-15',
    uid: 'local-practice-2026-01-15',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad',
    startDate: '2026-01-15T21:30:00.000Z',
    endDate: '2026-01-15T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-22',
    uid: 'local-practice-2026-01-22',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad',
    startDate: '2026-01-22T21:30:00.000Z',
    endDate: '2026-01-22T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-29',
    uid: 'local-practice-2026-01-29',
    title: '🥏 Team Practice',
    description: 'Thursday practice - both teams',
    startDate: '2026-01-29T21:30:00.000Z',
    endDate: '2026-01-29T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // SATURDAYS - A Team (Jan 10-24), then both teams (Jan 31)
  {
    id: 'local-practice-2026-01-10',
    uid: 'local-practice-2026-01-10',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad',
    startDate: '2026-01-10T19:00:00.000Z',
    endDate: '2026-01-10T21:30:00.000Z',
    allDay: false,
    location: 'Prospect Park Parade Grounds, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-17',
    uid: 'local-practice-2026-01-17',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad',
    startDate: '2026-01-17T19:00:00.000Z',
    endDate: '2026-01-17T21:30:00.000Z',
    allDay: false,
    location: 'Prospect Park Parade Grounds, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-24',
    uid: 'local-practice-2026-01-24',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad',
    startDate: '2026-01-24T19:00:00.000Z',
    endDate: '2026-01-24T21:30:00.000Z',
    allDay: false,
    location: 'Prospect Park Parade Grounds, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2026-01-31',
    uid: 'local-practice-2026-01-31',
    title: '🥏 Team Practice',
    description: 'Saturday practice - both teams',
    startDate: '2026-01-31T19:00:00.000Z',
    endDate: '2026-01-31T21:30:00.000Z',
    allDay: false,
    location: 'Prospect Park Parade Grounds, Brooklyn, NY',
    type: 'practice',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  }
];

// Remove the placeholder resume events
calendarData.events = calendarData.events.filter(e =>
  e.id !== 'local-practice-2026-01-06' && e.id !== 'local-practice-2026-01-27'
);

// Add new events to calendar data
januaryEvents.forEach(event => {
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

console.log(`\n✅ January schedule added! Total events: ${calendarData.events.length}`);
console.log('\n📅 January 2026 Schedule:');
console.log('   Mondays: Track Workouts (5pm-6:15pm, All players)');
console.log('   Jan 6-24: A Team + Winter Squad (Tues/Thurs/Sat)');
console.log('   Jan 27+: Both teams practice together');
console.log('\nNext steps:');
console.log('1. Run "npm run calendar:export" to create calendar.ics file');
console.log('2. Import calendar.ics into Google Calendar\n');
