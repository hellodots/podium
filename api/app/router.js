import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

import { ChallengeView } from "./views/challenge";
import { ActivityView } from "./views/activity";
import { TeamView } from "./views/team";

const app = express();
app.use(bodyParser.json({ strict: false }));

/****************
Challenge Routes
****************/

// Create challenge
app.post("/api/challenges", ChallengeView.create);

// Get challenge
app.get("/api/challenges/:id", ChallengeView.get);

// Get challenges
app.get("/api/challenges", ChallengeView.query);

// Update challenge
app.put("/api/challenges/:id", ChallengeView.update);

// Get challenge leaderboard
app.get("/api/challenges/:id/leaderboard", ChallengeView.getLeaderboard);

/****************
Activity Routes
****************/

// Create activity
app.post("/api/activities", ActivityView.create);

// Get activities
app.get("/api/activities", ActivityView.query);

/****************
Team Routes
****************/

// Create team
app.post("/api/teams", TeamView.create);

// Get team
app.get("/api/teams/:id", TeamView.get);

export const handler = serverless(app);
