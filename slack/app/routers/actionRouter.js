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

const publishToSNS = payload => {
  // Trigger action controller
  const params = {
    Message: JSON.stringify(payload),
    TopicArn: `${AWS_SNS_ARN}:${ACTION_CONTROLLER_TOPIC}`
  };

  return sns.publish(params).promise();
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const slackInteractions = createMessageAdapter(SLACK_VERIFICATION_TOKEN);
app.use("/slack/actions", slackInteractions.expressMiddleware());

slackInteractions.action("start_submission", async (payload, respond) => {
  try {
    await publishToSNS(payload);
  } catch (error) {
    await respond({
      text: "Failed to send publish to SNS"
    });
  }
});

slackInteractions.action("score_submission", async (payload, respond) => {
  try {
    await publishToSNS(payload);
  } catch (error) {
    await respond({
      text: "Failed to send publish to SNS"
    });
  }
});

export const handler = serverless(app);
