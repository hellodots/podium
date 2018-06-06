import { dialogUtil } from "../client/dialog";

export const start = (channelId, teamId, triggerId) => {
  // TODO: check for active challenge

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
        },
        {
          type: "text",
          subtype: "number",
          label: "Duration (days)",
          name: "duration",
          hint: "How long should the challenge last?",
          placeholder: "eg: 14"
        }
      ]
    }
  };

  return dialogUtil.open(message);
};
