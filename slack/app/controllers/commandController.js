import { help } from "../commands/help";
import { start } from "../commands/start";
import { end } from "../commands/end";
import { score } from "../commands/score";
import { rank } from "../commands/rank";

// Commands handler
export const handler = async (event, context, callback) => {
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
  if (command.includes("score")) {
    req = score(channelId, teamId, responseUrl, userId, text);
  } else if (command.includes("podium")) {
    switch (text) {
      case "start":
        req = start(channelId, teamId, responseUrl, triggerId);
        break;
      case "rank":
        req = rank(channelId, teamId, responseUrl);
        break;
      case "end":
        req = end(channelId, teamId, responseUrl, userId);
        break;
      default:
        req = help(responseUrl);
    }
  } else {
    req = help(responseUrl);
  }

  // Send message to Slack
  try {
    const res = await req;
    return callback(null, res);
  } catch (error) {
    console.log(error);
    return callback(error);
  }
};
