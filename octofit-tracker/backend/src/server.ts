import 'dotenv/config';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { LeaderboardEntry } from './models/LeaderboardEntry.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const apiRouter = express.Router();

const routeSummaries = {
  users: 'User profiles and authentication records',
  teams: 'Team creation and membership records',
  activities: 'Activity logging and tracking records',
  leaderboard: 'Competitive ranking records',
  workouts: 'Personalized workout suggestions',
};

const asyncRoute = (
  handler: (request: Request, response: Response, next: NextFunction) => Promise<void>,
) => (request: Request, response: Response, next: NextFunction) => {
  handler(request, response, next).catch(next);
};

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    api: `${baseUrl}/api`,
    health: `${baseUrl}/api/health`,
  });
});

apiRouter.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    resources: Object.keys(routeSummaries),
  });
});

apiRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

apiRouter.get(
  '/users/',
  asyncRoute(async (_request, response) => {
    const users = await User.find().sort({ username: 1 }).lean();
    response.json({ resource: 'users', description: routeSummaries.users, data: users });
  }),
);

apiRouter.get(
  '/teams/',
  asyncRoute(async (_request, response) => {
    const teams = await Team.find().sort({ name: 1 }).lean();
    response.json({ resource: 'teams', description: routeSummaries.teams, data: teams });
  }),
);

apiRouter.get(
  '/activities/',
  asyncRoute(async (_request, response) => {
    const activities = await Activity.find().sort({ activityDate: -1 }).lean();
    response.json({ resource: 'activities', description: routeSummaries.activities, data: activities });
  }),
);

apiRouter.get(
  '/leaderboard/',
  asyncRoute(async (_request, response) => {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    response.json({ resource: 'leaderboard', description: routeSummaries.leaderboard, data: leaderboard });
  }),
);

apiRouter.get(
  '/workouts/',
  asyncRoute(async (_request, response) => {
    const workouts = await Workout.find().sort({ title: 1 }).lean();
    response.json({ resource: 'workouts', description: routeSummaries.workouts, data: workouts });
  }),
);

app.use('/api', apiRouter);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error('API error:', error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});