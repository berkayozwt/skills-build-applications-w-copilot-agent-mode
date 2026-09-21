import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'maya_runner',
    email: 'maya.chen@example.com',
    firstName: 'Maya',
    lastName: 'Chen',
    bio: 'Marathon trainee who logs sunrise runs and mobility work.',
    teamName: 'Velocity Vibe',
    role: 'captain',
  },
  {
    username: 'leo_lifts',
    email: 'leo.martin@example.com',
    firstName: 'Leo',
    lastName: 'Martin',
    bio: 'Strength-focused athlete balancing lifting sessions with cycling.',
    teamName: 'Core Crushers',
    role: 'member',
  },
  {
    username: 'nora_yoga',
    email: 'nora.patel@example.com',
    firstName: 'Nora',
    lastName: 'Patel',
    bio: 'Yoga coach tracking flexibility, recovery, and mindful movement.',
    teamName: 'Flex Force',
    role: 'coach',
  },
  {
    username: 'sam_cycles',
    email: 'sam.rivera@example.com',
    firstName: 'Sam',
    lastName: 'Rivera',
    bio: 'Weekend cyclist focused on endurance and team challenges.',
    teamName: 'Velocity Vibe',
    role: 'member',
  },
];

const teams = [
  {
    name: 'Velocity Vibe',
    description: 'Endurance athletes chasing weekly running and cycling goals.',
    city: 'Seattle',
    coach: 'Maya Chen',
    members: ['maya_runner', 'sam_cycles'],
  },
  {
    name: 'Core Crushers',
    description: 'Strength training crew focused on progressive overload.',
    city: 'Austin',
    coach: 'Jordan Lee',
    members: ['leo_lifts'],
  },
  {
    name: 'Flex Force',
    description: 'Mobility and recovery team building consistency together.',
    city: 'Portland',
    coach: 'Nora Patel',
    members: ['nora_yoga'],
  },
];

const activities = [
  {
    username: 'maya_runner',
    type: 'Run',
    durationMinutes: 48,
    distanceKm: 8.4,
    caloriesBurned: 620,
    activityDate: new Date('2026-09-18T13:30:00.000Z'),
  },
  {
    username: 'leo_lifts',
    type: 'Strength Training',
    durationMinutes: 55,
    distanceKm: 0,
    caloriesBurned: 410,
    activityDate: new Date('2026-09-19T00:15:00.000Z'),
  },
  {
    username: 'nora_yoga',
    type: 'Yoga',
    durationMinutes: 40,
    distanceKm: 0,
    caloriesBurned: 180,
    activityDate: new Date('2026-09-19T14:00:00.000Z'),
  },
  {
    username: 'sam_cycles',
    type: 'Cycling',
    durationMinutes: 72,
    distanceKm: 28.6,
    caloriesBurned: 790,
    activityDate: new Date('2026-09-20T16:45:00.000Z'),
  },
];

const leaderboard = [
  { rank: 1, username: 'sam_cycles', teamName: 'Velocity Vibe', totalPoints: 3450, weeklyPoints: 820 },
  { rank: 2, username: 'maya_runner', teamName: 'Velocity Vibe', totalPoints: 3325, weeklyPoints: 760 },
  { rank: 3, username: 'leo_lifts', teamName: 'Core Crushers', totalPoints: 2890, weeklyPoints: 690 },
  { rank: 4, username: 'nora_yoga', teamName: 'Flex Force', totalPoints: 2410, weeklyPoints: 540 },
];

const workouts = [
  {
    title: 'Tempo Run Builder',
    focus: 'Cardio endurance',
    level: 'Intermediate',
    durationMinutes: 45,
    exercises: ['10-minute warmup jog', '4 x 6-minute tempo intervals', 'Cooldown walk'],
    recommendedFor: ['maya_runner', 'sam_cycles'],
  },
  {
    title: 'Total Body Strength Circuit',
    focus: 'Strength',
    level: 'Intermediate',
    durationMinutes: 50,
    exercises: ['Goblet squats', 'Dumbbell rows', 'Push press', 'Farmer carries'],
    recommendedFor: ['leo_lifts'],
  },
  {
    title: 'Recovery Mobility Flow',
    focus: 'Mobility',
    level: 'Beginner',
    durationMinutes: 30,
    exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring flows', 'Breathing reset'],
    recommendedFor: ['nora_yoga', 'maya_runner'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
