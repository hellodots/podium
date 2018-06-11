import { apiRequestUtil, requestUtil } from "../request";
import { chatUtil } from "../client/chat";
<<<<<<< HEAD
import { request } from "https";
=======
>>>>>>> f337f720b5b84c1223b45eb754cfb30ec5a9d3f4

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

  // Check if a deal name was entered
  let dealName = "Unnamed deal";
  if (deal && deal.length > 0) {
    dealName = deal;
  }

  // Assume only one metric per challenge for now, record it immediately
  let message = { channel: channelId };
  try {
    const createdActivity = await apiRequestUtil.createActivity(
      challenge.challengeId,
      teamId,
      userId,
      dealName
    );

    // Format Slack message
    message["text"] = `<@${userId}> just scored a \`${
      challenge.metric
    }\` with \`${createdActivity.deal}\`!`;
  } catch (error) {
    console.log(error);
    message["text"] = error;
  }
  return requestUtil.post(responseUrl, message);
};
