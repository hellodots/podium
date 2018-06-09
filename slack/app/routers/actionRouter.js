import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import { createMessageAdapter } from "@slack/interactive-messages";

// Environment variables
const {
  AWS_SNS_ARN,
  ACTION_CONTROLLER_TOPIC,
  SLACK_VERIFICATION_TOKEN
} = process.env;

const sns = new AWS.SNS();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const slackInteractions = createMessageAdapter(SLACK_VERIFICATION_TOKEN);
app.use("/slack/actions", slackInteractions.expressMiddleware());

slackInteractions.action("start_submission", async (payload, respond) => {
  // Parse payload
  const { actions, callback_id: callbackId, submission } = payload;
  const channelId = payload.channel.id;
  const teamId = payload.team.id;
  const userId = payload.user.id;

  // Trigger action controller
  const params = {
    Message: JSON.stringify(payload),
    TopicArn: `${AWS_SNS_ARN}:${ACTION_CONTROLLER_TOPIC}`
  };

  try {
    await sns.publish(params).promise();
    await respond({
      text: `Great! I will announce the \`${
        submission.metric
      }\` challenge in <#${channelId}> now.`
    });
  } catch (error) {
    res.status(400).end(error);
  }
});

export const handler = serverless(app);
