import { chatUtil } from "../client/chat";
import { apiRequestUtil } from "../request";

export const startSubmission = async (
  channelId,
  teamId,
  userId,
  submission
) => {
  // TODO: Check for existing challenge

  // Post to create challenge
  try {
    const challenge = await apiRequestUtil.createChallenge(
      channelId,
      teamId,
      userId,
      submission.metric,
      submission.duration
    );
  } catch (error) {
    // TODO: Update error message
    // Message the error to the user
    return chatUtil.postEphemeral({
      channel: channelId,
      user: userId,
      text: error.response.data
    });
  }

  return chatUtil.postMessage({
    channel: channelId,
    text: `<!channel>: <@${userId}> has started a new challenge for \`${
      submission.metric
    }\`!`
  });
};
