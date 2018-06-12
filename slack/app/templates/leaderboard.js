import { apiRequestUtil } from "../request";

export const formatLeaderboard = (challenge, leaderboard) => {
  // Pretty print leaderboard
  const fields = leaderboard.map(item => {
    const [userId, points] = item;
    return {
      value: `<@${userId}> ..... ${points}`
    };
  });

  const attachments = [
    {
      fallback: `${challenge.metric} leaderboard`,
      title: `${challenge.metric} leaderboard`,
      color: "#2eb886",
      fields: fields
    }
  ];

  return attachments;
};
