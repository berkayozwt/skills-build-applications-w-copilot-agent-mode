import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetGoal: { type: String, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);