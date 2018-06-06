import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

import { dynamoDBUtil } from "./db";

const app = express();
app.use(bodyParser.json({ strict: false }));

// Create challenge
app.post("/api/challenge", async (req, res) => {
  const { channelId, teamId, userId, metric, duration } = req.body;

  let challenge;
  try {
    challenge = await dynamoDBUtil.createChallenge(
      channelId,
      teamId,
      userId,
      metric,
      duration
    );
  } catch (error) {
    res.status(400).end(error.message);
    return;
  }

  res.json({ ...challenge }).end();
});

export const handler = serverless(app);
