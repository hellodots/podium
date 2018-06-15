export const formatStartMessage = triggerId => ({
  trigger_id: triggerId,
  dialog: {
    callback_id: "start_submission",
    title: "Start a challenge",
    submit_label: "Start",
    elements: [
      {
        type: "text",
        label: "Title",
        name: "title",
        hint: "What is your goal?",
        placeholder: "eg: 30 day sprint"
      },
      {
        type: "text",
        label: "Metric 1",
        name: "metric1",
        hint: "What metric would you like to track?",
        placeholder: "eg: Calls made",
        optional: true
      },
      {
        type: "text",
        label: "Metric 2",
        name: "metric2",
        hint: "What metric would you like to track?",
        placeholder: "eg: Deals created",
        optional: true
      },
      {
        type: "text",
        label: "Metric 3",
        name: "metric3",
        hint: "What metric would you like to track?",
        placeholder: "eg: Deals closed",
        optional: true
      }
    ]
  }
});
