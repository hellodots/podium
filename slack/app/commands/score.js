import { apiRequestUtil, requestUtil } from "../request";
import { chatUtil } from "../client/chat";
import { getScoreBoard } from "../templates/getScores";

export const score = async (channelId, teamId, responseUrl, userId, deal) => {
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
  if (challenges.length != 1) {
    // Did not find an existing active challenge in channel
    return requestUtil.post(responseUrl, {
      text: `There's no active challenge in <#${channelId}>`
    });
  }
  const challenge = challenges[0];

  // Check if a deal name was entered
  let dealName = "Unnamed deal";
  if (deal.length > 0) {
    dealname = deal;
  }

  // Assume only one metric per challenge for now, record it immediately
  try {
    const createdActivity = await apiRequestUtil.createActivity(
      challenge.challengeId,
      teamId,
      userId,
      dealName
    );

    // Format Slack message
    console.log(channelId);
    const message = {
      channel: channelId,
      text: `<@${userId}> just scored a \`${challenge.metric}\` with \`${
        createdActivity.deal
      }\`!`,
      attachments: await getScoreBoard(challenge)
    };

    return chatUtil.postMessage(message);
  } catch (error) {
    console.log(error);
    return requestUtil.post(responseUrl, { text: error });
  }
};
