import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";

const sns = new AWS.SNS();

const app = express();
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.body.token != process.env.SLACK_VERIFICATION_TOKEN) {
    res.status(403).end("Access forbidden");
  }
  next();
});

app.post("/slack/command", async (req, res) => {
  const params = {
    Message: JSON.stringify(req.body),
    TopicArn: `${process.env.AWS_SNS_ARN}:${process.env.CONTROLLER_TOPIC}`
  };

  try {
    const message = await sns.publish(params).promise();
  } catch (error) {
    res.status(400).end(error);
  }

  res.status(200).end();
});

export const handler = serverless(app);
