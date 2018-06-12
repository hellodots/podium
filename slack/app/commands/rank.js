import { apiRequestUtil, requestUtil } from "../request";
import { formatLeaderboard } from "../templates/leaderboard";

export const rank = async (channelId, teamId, responseUrl, triggerId) => {
  // Check for existing challenge
  let challenges;
  try {
    challenges = await apiRequestUtil.getChallenges(channelId, teamId, 1);
  } catch (error) {
    console.log(error);
    // Message the error to the user
    return requestUtil.post(responseUrl, {
      text: error
    });
  }
  if (challenges.length === 0) {
    // Did not find an existing active challenge in channel
    return requestUtil.post(responseUrl, {
      text: `There's no active challenge in <#${channelId}>`
    });
  } else if (challenges.length > 1) {
    // Found multiple active challenges in channel
    return requestUtil.post(responseUrl, {
      text: `There are multiple active challenges in <#${channelId}>`
    });
  }
  const challenge = challenges[0];

  let message = { channel: channelId };
  try {
    const rawLeaderboard = await apiRequestUtil.getLeaderboard(
      challenge.challengeId,
      channelId,
      teamId
    );
    message["response_type"] = "in_channel";
    message["attachments"] = formatLeaderboard(challenge, rawLeaderboard);
  } catch (error) {
    console.log(error);
    message["text"] = error;
  }

  return requestUtil.post(responseUrl, message);
};
