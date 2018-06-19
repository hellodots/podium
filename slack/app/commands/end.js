import { apiRequestUtil, requestUtil } from "../request";
import { formatLeaderboard } from "../templates/leaderboard";

export const end = async (channelId, teamId, responseUrl, userId) => {
  // Get active challenge
  let challenge;
  try {
    challenge = await apiRequestUtil.getActiveChallenge(channelId, teamId);
  } catch (error) {
    return requestUtil.post(responseUrl, { text: error });
  }

  // Update challenge to be inactive
  let message = { channel: channelId };
  try {
    const updatedChallenge = await apiRequestUtil.updateChallenge(
      challenge.challengeId,
      channelId,
      teamId,
      0
    );

    message["response_type"] = "in_channel";
    message[
      "text"
    ] = `<!here> That's a wrap! :tada: :sports_medal: <@${userId}> has ended the challenge for \`${
      updatedChallenge.title
    }\`!`;
  } catch (error) {
    console.log(error);
    message["text"] = error;
    return requestUtil.post(responseUrl, message);
  }

  // Get challenge leaderboard
  try {
    const rawLeaderboard = await apiRequestUtil.getLeaderboard(
      challenge.challengeId,
      channelId,
      teamId
    );
    message["response_type"] = "in_channel";
    message["attachments"] = formatLeaderboard(rawLeaderboard);
  } catch (error) {
    console.log(error);
  }

  return requestUtil.post(responseUrl, message);
};
