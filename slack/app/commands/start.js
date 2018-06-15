import { Dialog } from "../client/dialog";
import { apiRequestUtil, requestUtil } from "../request";

export const start = async (channelId, teamId, responseUrl, triggerId) => {
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
  if (challenges.length > 0) {
    // Found an existing active challenge in channel
    return requestUtil.post(responseUrl, {
      text: `There's already an active challenge in <#${channelId}>`
    });
  }

  // No active challenge was found, continue with dialog
  const message = {
    trigger_id: triggerId,
    dialog: {
      callback_id: "start_submission",
      title: "Start a challenge",
      submit_label: "Start",
      elements: [
        {
          type: "text",
          label: "Metric description",
          name: "metric",
          hint: "What metric would you like to track?",
          placeholder: "eg: Deals created"
        }
      ]
    }
  };

  return Dialog.open(teamId, message);
};
