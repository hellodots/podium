import { apiRequestUtil, requestUtil } from "../request";

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

  // Notify channel of new activty
  // TODO: Might not be able to post in channel after using interacitve buttons
  // Might have to use the chat client
  const message = {
    response_type: "in_channel",
    text: `<@${userId}> just scored \`${createdActivity.metric}\`${
      createdActivity.deal ? ` with *${createdActivity.deal}*` : ""
    }!`
  };
  return requestUtil.post(responseUrl, message);
};
