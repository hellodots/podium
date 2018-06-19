import { apiRequestUtil } from "../request";

export const formatLeaderboard = (challenge, leaderboard) => {
  // Pretty print leaderboard
  let total = 0;
  const fields = leaderboard.map((item, index) => {
    const [userId, points] = item;
    total += points;
    const rank = index + 1;
    return {
      value: `#${rank}: <@${userId}> (${points} points)`
    };
  });

  const attachments = [
    {
      fallback: `Team total: ${total} ${challenge.metric}`,
      title: `Team total: ${total} ${challenge.metric}`,
      color: "#a137e8",
      fields: fields
    }
  ];

  return attachments;
};
