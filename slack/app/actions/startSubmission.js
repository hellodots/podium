import { chatUtil } from "../client/chat";
import { apiRequestUtil } from "../request";

export const startSubmission = async (
  channelId,
  teamId,
  userId,
  submission
) => {
  // Post to create challenge
  try {
    const challenge = await apiRequestUtil.createChallenge(
      channelId,
      teamId,
      userId,
      submission.metric,
      submission.duration
    );

    const message = {
      channel: channelId,
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
    return chatUtil.postMessage(message);
  } catch (error) {
    // TODO: Update error message
    // Message the error to the user
    return chatUtil.postEphemeral({
      channel: channelId,
      user: userId,
      text: error
    });
  }
};
