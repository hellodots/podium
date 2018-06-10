import { startSubmission } from "../actions/startSubmission";
import { scoreSubmission } from "../actions/scoreSubmission";

export const handler = async (event, context, callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message);

  // Parse message
  const { actions, callback_id: callbackId, submission } = message;
  const channelId = message.channel.id;
  const teamId = message.team.id;
  const userId = message.user.id;

  let req;
  switch (callbackId) {
    case "start_submission":
      req = startSubmission(channelId, teamId, userId, submission);
      break;
    case "score_submission":
      req = scoreSubmission(channelId, teamId, userId, submission);
      break;
    default:
      console.log("Invalid event callback id");
      return;
  }

  // Send message to Slack
  try {
    await req;
  } catch (error) {
    return callback(error);
  }
  return callback(null, "Success");
};
