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
      submission.title,
      submission.metric1,
      submission.metric2,
      submission.metric3
    );

    const message = {
      channel: channelId,
      response_type: "in_channel",
      text: `<!here> <@${
        challenge.userId
      }> has started a new challenge called ${challenge.title}!`,
      attachments: [
        {
          fallback: "How to participate",
          title: "Here's how it works",
          fields: [
            {
              value: `- Type \`/score\` followed by the deal name (eg. /score Acme Corp) for every *${challenge.metrics
                .filter(metric => !!metric)
                .join("* or *")}* to track your progress.`
            },
            {
              value: `- Type \`/podium rank\` to view the leaderboard instantly.`
            },
            {
              value: `- Type \`/podium end\` to wrap up and declare the winner(s).`
            },
            {
              value: `Don't forget to cheer or chirp each other on :stuck_out_tongue_winking_eye: good luck and have fun!`
            }
          ]
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
