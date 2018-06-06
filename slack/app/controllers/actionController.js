import { createChallenge } from "../actions/createChallenge";

export const handler = async (event, context) => {
  const message = JSON.parse(event.Records[0].Sns.Message);

  // Parse message
  const { actions, callback_id: callbackId, submission } = message;
  const channelId = message.channel.id;
  const teamId = message.team.id;
  const userId = message.user.id;

  let req;
  switch (callbackId) {
    case "start_submission":
      req = createChallenge(channelId, teamId, userId, submission);
      break;
    default:
      console.log("Invalid event callback id");
      return;
  }

  // Send message to Slack
  try {
    const res = await req;
  } catch (error) {
    console.log(error);
  }
};
