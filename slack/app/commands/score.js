import { apiRequestUtil, requestUtil } from "../request";
import { formatScoreMessage } from "../templates/scoreMessage";

export const score = async (channelId, teamId, responseUrl, userId, deal) => {
  // Get active challenge
  let challenge;
  try {
    challenge = await apiRequestUtil.getActiveChallenge(channelId, teamId);
  } catch (error) {
    return requestUtil.post(responseUrl, { text: error });
  }

  const message = formatScoreMessage(challenge, deal);
  return requestUtil.post(responseUrl, message);
};
