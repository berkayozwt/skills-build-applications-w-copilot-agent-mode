import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    coach: { type: String, required: true },
    members: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Team = mongoose.model('Team', teamSchema, 'teams');