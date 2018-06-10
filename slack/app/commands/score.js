import { apiRequestUtil, requestUtil } from "../request";

export const score = async (channelId, teamId, responseUrl) => {
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

  // Found the active challenge in channel, announce score entry
  const interactiveButtons = {
    text: "Nice! Which activity did you score with `Acme Corp`?",
    attachments: [
      {
        text: "Select the activity",
        callback_id: "score_submission",
        actions: [
          {
            name: "deal_created",
            text: "Deal created (1pt)",
            value: "deal_created",
            type: "button"
          },
          {
            name: "deal_closed",
            text: "Deal closed  (5pt)",
            value: "deal_closed",
            type: "button"
          },
          {
            name: "deal_stolen",
            text: "Deal stolen from Magento (15pt)",
            value: "deal_stolen",
            type: "button"
          }
        ]
      }
    ]
  };
  return requestUtil.post(responseUrl, interactiveButtons);
};
