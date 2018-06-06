import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ strict: false }));

// Create challenge
app.post("/api/challenge", (req, res) => {
  const { channelId, teamId, userId, metric, duration } = req.body;

  const challenge = {
    id: 12345
  };

  setTimeout(() => {
    res.json({ ...challenge });
  }, 2000);
});

export const handler = serverless(app);
