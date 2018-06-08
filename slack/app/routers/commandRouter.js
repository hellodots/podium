import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";

// Environment variables
const {
  AWS_SNS_ARN,
  COMMAND_CONTROLLER_TOPIC,
  SLACK_VERIFICATION_TOKEN
} = process.env;

const sns = new AWS.SNS();

const app = express();
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.body.token != SLACK_VERIFICATION_TOKEN) {
    res.status(403).end("Access forbidden");
  }
  next();
});

app.post("/slack/commands", async (req, res) => {
  // Trigger command controller
  const params = {
    Message: JSON.stringify(req.body),
    TopicArn: `${AWS_SNS_ARN}:${COMMAND_CONTROLLER_TOPIC}`
  };

  let message;
  try {
    message = await sns.publish(params).promise();
  } catch (error) {
    res.status(400).end(error);
  }

  res.status(200).end();
});

export const handler = serverless(app);
