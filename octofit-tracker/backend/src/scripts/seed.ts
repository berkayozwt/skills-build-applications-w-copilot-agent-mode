import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya, eli] = await User.insertMany([
      {
        username: 'maya_runner',
        email: 'maya@example.com',
        passwordHash: 'sample-hash-maya',
        displayName: 'Maya Chen',
        age: 29,
        fitnessGoal: 'Improve 10K pace',
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        passwordHash: 'sample-hash-jordan',
        displayName: 'Jordan Smith',
        age: 34,
        fitnessGoal: 'Build strength',
      },
      {
        username: 'priya_cycles',
        email: 'priya@example.com',
        passwordHash: 'sample-hash-priya',
        displayName: 'Priya Patel',
        age: 26,
        fitnessGoal: 'Increase endurance',
      },
      {
        username: 'eli_yoga',
        email: 'eli@example.com',
        passwordHash: 'sample-hash-eli',
        displayName: 'Eli Rivera',
        age: 31,
        fitnessGoal: 'Improve mobility',
      },
    ]);

    const [trailBlazers, coreCrew] = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor cardio group focused on weekly distance goals.',
        captain: maya._id,
        members: [maya._id, priya._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility team for balanced training.',
        captain: jordan._id,
        members: [jordan._id, eli._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: maya._id,
        type: 'Running',
        durationMinutes: 46,
        distanceKm: 8.2,
        caloriesBurned: 540,
        loggedAt: new Date('2026-09-26T07:30:00Z'),
      },
      {
        user: jordan._id,
        type: 'Strength Training',
        durationMinutes: 58,
        caloriesBurned: 430,
        loggedAt: new Date('2026-09-27T18:15:00Z'),
      },
      {
        user: priya._id,
        type: 'Cycling',
        durationMinutes: 72,
        distanceKm: 28.4,
        caloriesBurned: 690,
        loggedAt: new Date('2026-09-28T06:45:00Z'),
      },
      {
        user: eli._id,
        type: 'Yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        loggedAt: new Date('2026-09-29T12:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: priya._id, team: trailBlazers._id, rank: 1, totalPoints: 1840, weeklyMinutes: 215 },
      { user: maya._id, team: trailBlazers._id, rank: 2, totalPoints: 1725, weeklyMinutes: 198 },
      { user: jordan._id, team: coreCrew._id, rank: 3, totalPoints: 1610, weeklyMinutes: 186 },
      { user: eli._id, team: coreCrew._id, rank: 4, totalPoints: 1320, weeklyMinutes: 150 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        targetGoal: 'Improve 10K pace',
        exercises: ['10 minute warmup jog', '20 minute tempo run', '6 strides', 'Cooldown walk'],
      },
      {
        title: 'Foundational Strength Circuit',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 35,
        targetGoal: 'Build strength',
        exercises: ['Goblet squats', 'Dumbbell rows', 'Push-ups', 'Plank holds'],
      },
      {
        title: 'Endurance Ride Intervals',
        category: 'Cycling',
        difficulty: 'Advanced',
        durationMinutes: 60,
        targetGoal: 'Increase endurance',
        exercises: ['Zone 2 warmup', '5 hill repeats', 'Steady cadence block', 'Easy spin cooldown'],
      },
      {
        title: 'Mobility Reset Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        targetGoal: 'Improve mobility',
        exercises: ['Cat-cow flow', 'Hip openers', 'Hamstring stretch', 'Breathing cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
