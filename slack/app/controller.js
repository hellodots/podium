import { help } from "./commands/help";
import { start } from "./commands/start";

export const handler = async (event, context) => {
  const message = JSON.parse(event.Records[0].Sns.Message);

  // Parse message
  const {
    channel_id: channelId,
    command,
    response_url: responseUrl,
    team_id: teamId,
    text,
    token,
    trigger_id: triggerId,
    user_id: userId
  } = message;

  let req;
  switch (text) {
    case "start":
      req = start(channelId, teamId, triggerId);
      break;
    case "score":
      // TODO: start challenge function
      break;
    case "check":
      // TODO: start challenge function
      break;
    case "end":
      // TODO: start challenge function
      break;
    default:
      req = help(responseUrl);
  }

  // Send message to Slack
  try {
    const res = await req;
  } catch (error) {
    console.log(error);
  }
};
