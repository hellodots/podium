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

    return chatUtil.postMessage({
      channel: channelId,
      text: `<!here>: <@${
        challenge.userId
      }> has started a new challenge for \`${challenge.metric}\`!`
    });
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
