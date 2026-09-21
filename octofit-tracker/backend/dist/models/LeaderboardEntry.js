import mongoose from 'mongoose';
const leaderboardEntrySchema = new mongoose.Schema({
    rank: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    totalPoints: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
}, { timestamps: true });
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
