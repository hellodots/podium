import serverless from "serverless-http";
import express from "express";

import { apiRequestUtil, requestUtil } from "../request";

// Environment variables
const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = process.env;

const app = express();

app.get("/slack/authorization", async (req, res) => {
  // Get Slack team oauth access code
  const code = req.query.code;

  // Check if auth access was denied
  if (req.query.error) {
    res.status(400).end("Error... :(");
  }

  let response;
  try {
    response = await requestUtil.get("https://slack.com/api/oauth.access", {
      client_id: SLACK_CLIENT_ID,
      client_secret: SLACK_CLIENT_SECRET,
      code
    });
  } catch (error) {
    console.log(error);
    res.status(400).end(error);
  }

  // Create team in database
  const {
    team_id: teamId,
    access_token: token,
    team_name: teamName
  } = response;

  try {
    const createdTeam = await apiRequestUtil.createTeam(
      teamId,
      token,
      teamName
    );
    res.status(200).end("Success! :)");
  } catch (error) {
    console.log(error);
    res.status(400).end(error);
  }
});

export const handler = serverless(app);
