import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

import { ChallengeView } from "./views/challenge";
import { ActivityView } from "./views/activity";

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

/****************
Activity Routes 
****************/

// Create activity
app.post("/api/activities", ActivityView.create);

// Get activities
app.get("/api/activities", ActivityView.query);

export const handler = serverless(app);
