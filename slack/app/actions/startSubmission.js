import { apiRequestUtil, requestUtil } from "../request";

export const startSubmission = async (
  channelId,
  teamId,
  userId,
  submission,
  responseUrl
) => {
  // Post to create challenge
  try {
    const challenge = await apiRequestUtil.createChallenge(
      channelId,
      teamId,
      userId,
      submission.metric
    );

    const message = {
      channel: channelId,
      response_type: "in_channel",
      text: `<!here> <@${challenge.userId}> has started a new challenge!`,
      attachments: [
        {
          fallback: "How to participate",
          title: `Metric: ${challenge.metric}`,
          text: `Type \`/score\` followed by the deal name (eg. */score Acme Corp*) for every _${
            challenge.metric
          }_ to track your progress and \`/podium rank\` to view the leaderboard instantly. \n\n Good luck!`
        }
      ]
    };
    return requestUtil.post(responseUrl, message);
  } catch (error) {
    // TODO: Update error message
    // Message the error to the user
    const message = {
      response_type: "ephemeral",
      text: "error"
    };
    return requestUtil.post(responseUrl, message);
  }
};
