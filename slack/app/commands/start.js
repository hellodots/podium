import { Dialog } from "../client/dialog";
import { apiRequestUtil, requestUtil } from "../request";
import { formatStartMessage } from "../templates/startMessage";

export const start = async (channelId, teamId, responseUrl, triggerId) => {
  // Check for existing challenge
  let challenges;
  try {
    challenges = await apiRequestUtil.getChallenges(channelId, teamId, 1);
  } catch (error) {
    // Message the error to the user
    return requestUtil.post(responseUrl, { text: error });
  }

  if (challenges.length > 0) {
    // Found an existing active challenge in channel
    return requestUtil.post(responseUrl, {
      text: `There's already an active challenge in <#${channelId}>`
    });
  }

  // No active challenge was found, continue with dialog
  const message = formatStartMessage(triggerId);

  return Dialog.open(teamId, message);
};
