import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

import { ChallengeView } from "./views/challenge";

const app = express();
app.use(bodyParser.json({ strict: false }));

// Create challenge
app.post("/api/challenges", ChallengeView.create);

// Get challenge
app.get("/api/challenges/:id", ChallengeView.get);

// Get challenges
app.get("/api/challenges", ChallengeView.query);

app.put("/api/challenges/:id", ChallengeView.update);

export const handler = serverless(app);
