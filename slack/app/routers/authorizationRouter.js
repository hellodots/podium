import serverless from "serverless-http";
import express from "express";

import { requestUtil } from "../request";

// Environment variables
const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = process.env;

const app = express();

app.get("/slack/authorization", async (req, res) => {
  const code = req.query.code;
  let response;
  try {
    response = await requestUtil.get("https://slack.com/api/oauth.access", {
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code
    });
  } catch (error) {
    console.log(error);
    response = error;
  }
  res.json(response).end();
});

export const handler = serverless(app);
