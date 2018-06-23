import { apiRequestUtil, requestUtil } from "../request";
import { Chat } from "../client/chat";

export const scoreSubmission = async (
  channelId,
  teamId,
  userId,
  actions,
  responseUrl
) => {
  // Get active challenge
  let challenge;
  try {
    challenge = await apiRequestUtil.getActiveChallenge(channelId, teamId);
  } catch (error) {
    return requestUtil.post(responseUrl, { text: error });
  }

  // Post to create activity
  let createdActivity;
  try {
    // Split action value to get deal and metric
    const [deal, metric] = actions[0].value.split("-");
    createdActivity = await apiRequestUtil.createActivity(
      challenge.challengeId,
      channelId,
      teamId,
      userId,
      deal,
      metric
    );
  } catch (error) {
    return requestUtil.post(responseUrl, { text: error });
  }

  // Delete original message with button
  requestUtil.post(responseUrl, { delete_original: "true" });

  // Notify channel of new activty
  const message = {
    channel: channelId,
    response_type: "in_channel",
    text: `<@${userId}> just scored \`${createdActivity.metric}\`${
      createdActivity.deal ? ` with *${createdActivity.deal}*` : ""
    }!`
  };

  return Chat.postMessage(teamId, message);
};
