"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res, next) => {
    try {
        const users = await User_1.default.find().select('-passwordHash').sort({ displayName: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams/', async (_req, res, next) => {
    try {
        const teams = await Team_1.default.find().populate('captain', 'username displayName').populate('members', 'username displayName');
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.default.find().populate('user', 'username displayName').sort({ loggedAt: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user', 'username displayName')
            .populate('team', 'name')
            .sort({ rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.default.find().sort({ difficulty: 1, title: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
