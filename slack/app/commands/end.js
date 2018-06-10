import { chatUtil } from "../client/chat";
import { apiRequestUtil, requestUtil } from "../request";
import { fetchChallenge } from "../../../api/app/views/challenge";

export const end = async (channelId, teamId, userId, responseUrl) => {
  // Check for existing challenge
  let challenges;
  try {
    challenges = await fetchChallenge(channelId, teamId, 1);
  } catch (error) {
    console.log(error);
    // Message the error to the user
    return requestUtil.post(responseUrl, {
      text: error
    });
  }
  if (challenges.length != 1) {
    // Found an existing active challenge in channel
    return requestUtil.post(responseUrl, {
      text: `There's no active challenge in <#${channelId}>`
    });
  }

  // Update challenge to be inactive
  let challenge = challenges[0];
  try {
    const updatedChallenge = await apiRequestUtil.updateChallenge(
      challenge.challengeId,
      teamId,
      userId,
      false
    );

    return chatUtil.postMessage({
      channel: channelId,
      text: `<!here>: <@${userId}> has ended the challenge for \`${
        challenge.metric
      }\`!`
    });
  } catch (error) {
    console.log(error);
  }
};
