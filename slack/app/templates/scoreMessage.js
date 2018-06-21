export const formatScoreMessage = (challenge, deal) => {
  // Value is a combination of deal name and metric
  const actions = challenge.metrics.map((metric, idx) => ({
    name: "metric",
    text: metric,
    type: "button",
    value: `${deal}-${metric}`
  }));

  return {
    text: `Nice one ${deal ? `with _${deal}_` : ""}!`,
    attachments: [
      {
        text: "Which metric you just score?",
        fallback: "You are unable to pick a metric",
        callback_id: "score_submission",
        color: "#3AA3E3",
        attachment_type: "default",
        actions: actions
      }
    ]
  };
};
