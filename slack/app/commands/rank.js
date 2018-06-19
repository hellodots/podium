import { apiRequestUtil, requestUtil } from "../request";
import { formatLeaderboard } from "../templates/leaderboard";

export const rank = async (channelId, teamId, responseUrl, triggerId) => {
  // Get active challenge
  let challenge;
  try {
    challenge = await apiRequestUtil.getActiveChallenge(channelId, teamId);
  } catch (error) {
    return requestUtil.post(responseUrl, { text: error });
  }

  let message = { channel: channelId };
  try {
    const rawLeaderboard = await apiRequestUtil.getLeaderboard(
      challenge.challengeId,
      channelId,
      teamId
    );
    message["text"] = `Here's the leaderboard for ${challenge.title}`;
    message["response_type"] = "in_channel";
    message["attachments"] = formatLeaderboard(rawLeaderboard);
  } catch (error) {
    console.log(error);
    message["text"] = error;
  }

  return requestUtil.post(responseUrl, message);
};
