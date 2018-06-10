import { chatUtil } from "../client/chat";
import { apiRequestUtil } from "../request";
import { getScoreBoard } from "../templates/getScores";

export const scoreSubmission = async (
  channelId,
  teamId,
  userId,
  submission
) => {
  // Todo: save activity to database
  try {
    // const challenge = await apiRequestUtil.createChallenge(
    //   channelId,
    //   teamId,
    //   userId,
    //   submission.metric,
    //   submission.duration
    // );

    const scoreAttachment = getScoreBoard(1);
    const message = {
      channel: channelId,
      text: `<@${userId}> just scored a \`Deal created\` for 1 point with \`Acme Corp\`!`,
      attachments: scoreAttachment
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
