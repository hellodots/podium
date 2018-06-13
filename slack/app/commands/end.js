import { apiRequestUtil, requestUtil } from "../request";
import { formatLeaderboard } from "../templates/leaderboard";

export const end = async (channelId, teamId, responseUrl, userId) => {
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
      updatedChallenge.metric
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
    message["attachments"] = formatLeaderboard(challenge, rawLeaderboard);
  } catch (error) {
    console.log(error);
  }

  return requestUtil.post(responseUrl, message);
};
