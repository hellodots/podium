import { chatUtil } from "../client/chat";

export const createChallenge = (channelId, teamId, userId, submission) => {
  return chatUtil.postMessage({
    channel: channelId,
    text: `<!channel>: <@${userId}> has started a new challenge for \`${
      submission.metric
    }\`!`
  });
};
