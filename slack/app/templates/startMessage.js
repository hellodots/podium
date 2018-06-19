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
        hint: "When does this challenge start/end??",
        placeholder: "eg: July sprint"
      },
      {
        type: "text",
        label: "Primary Metric",
        name: "metric1",
        hint: "What is the most important key activity to track?",
        placeholder: "eg: Deals won"
      },
      {
        type: "text",
        label: "Secondary Metric",
        name: "metric2",
        hint: "What is another key activity?",
        placeholder: "eg: Deals created",
        optional: true
      }
      // TODO: Hide for now until user request
      // {
      //   type: "text",
      //   label: "3rd Metric",
      //   name: "metric3",
      //   hint: "What metric would you like to track?",
      //   placeholder: "eg: Deals closed",
      //   optional: true
      // }
    ]
  }
});
