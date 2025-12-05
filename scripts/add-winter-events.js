#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'calendar-events.json');

// Load existing calendar data
const calendarData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Winter schedule events - CORRECT DATES
const winterEvents = [
  // MONDAYS - Track Workouts (All players)
  {
    id: 'local-track-2025-12-08',
    uid: 'local-track-workout-2025-12-08',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2025-12-08T22:00:00.000Z', // 5pm EST
    endDate: '2025-12-08T23:15:00.000Z',   // 6:15pm EST
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-track-2025-12-15',
    uid: 'local-track-workout-2025-12-15',
    title: '🏃 Track Workout',
    description: 'Monday track workout - open to all players',
    startDate: '2025-12-15T22:00:00.000Z',
    endDate: '2025-12-15T23:15:00.000Z',
    allDay: false,
    location: 'McCarren Park Track, Lorimer Street, Union & Driggs Avenue, Brooklyn, NY 11211',
    type: 'track-workout',
    team: 'both',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // TUESDAYS - Practices (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-09',
    uid: 'local-practice-2025-12-09',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-09T21:30:00.000Z', // 4:30pm EST
    endDate: '2025-12-09T23:30:00.000Z',   // 6:30pm EST
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2025-12-16',
    uid: 'local-practice-2025-12-16',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Tuesday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-16T21:30:00.000Z',
    endDate: '2025-12-16T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // THURSDAYS - Practices (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-11',
    uid: 'local-practice-2025-12-11',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-11T21:30:00.000Z',
    endDate: '2025-12-11T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2025-12-18',
    uid: 'local-practice-2025-12-18',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Thursday practice for A Team and Winter Squad invitees - Last before holiday break',
    startDate: '2025-12-18T21:30:00.000Z',
    endDate: '2025-12-18T23:30:00.000Z',
    allDay: false,
    location: 'McCarren Park, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },

  // SATURDAYS - Practices (A Team + Winter Squad)
  {
    id: 'local-practice-2025-12-06',
    uid: 'local-practice-2025-12-06',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-06T19:00:00.000Z', // 2pm EST
    endDate: '2025-12-06T21:30:00.000Z',   // 4:30pm EST
    allDay: false,
    location: 'Prospect Park Parade Grounds Field 8, Brooklyn, NY',
    type: 'practice',
    team: 'a-team',
    recurring: { enabled: false },
    source: 'local',
    status: 'confirmed'
  },
  {
    id: 'local-practice-2025-12-13',
    uid: 'local-practice-2025-12-13',
    title: '🥏 A Team + Winter Squad Practice',
    description: 'Saturday practice for A Team and Winter Squad invitees',
    startDate: '2025-12-13T19:00:00.000Z',
    endDate: '2025-12-13T21:30:00.000Z',
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
    startDate: '2026-01-06T21:30:00.000Z', // 4:30pm EST (Tuesday)
    endDate: '2026-01-06T23:30:00.000Z',
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
    startDate: '2026-01-27T21:30:00.000Z', // 4:30pm EST (Tuesday)
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
console.log('\n📅 Schedule Summary (Dec 6-18, 2025):');
console.log('   Mondays: Track Workouts (5pm-6:15pm, All players)');
console.log('   Tuesdays: A Team + Winter Squad Practice (4:30pm-6:30pm)');
console.log('   Thursdays: A Team + Winter Squad Practice (4:30pm-6:30pm)');
console.log('   Saturdays: A Team + Winter Squad Practice (2pm-4:30pm)');
console.log('\nNext steps:');
console.log('1. Run "npm run calendar:export" to create calendar.ics file');
console.log('2. Import calendar.ics into Google Calendar');
console.log('3. Run "npm run calendar:sync" to sync back from Google Calendar\n');
