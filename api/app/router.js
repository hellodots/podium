import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

import { ChallengeView } from "./views/challenge";

const app = express();
app.use(bodyParser.json({ strict: false }));

// Create challenge
app.post("/api/challenge", ChallengeView.create);

export const handler = serverless(app);
