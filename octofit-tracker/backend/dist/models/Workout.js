"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetGoal: { type: String, required: true },
    exercises: [{ type: String, required: true }],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Workout', workoutSchema);
