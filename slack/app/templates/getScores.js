import { apiRequestUtil } from "../request";

export const getScoreBoard = async challenge => {
  // Get all users and activities from database
  let activities = [];
  try {
    activities = await apiRequestUtil.getActivities(challenge.challengeId);
  } catch (error) {
    console.log(error);
  }

  // Group activities by user
  const scores = activities.reduce((acc, activity) => {
    const { teamUserId, points } = activity;
    // Split the userTeamId and get the userId
    const userId = teamUserId.split("-")[1];
    if (acc.has(userId)) {
      acc.set(userId, acc.get(userId) + points);
    } else {
      acc.set(userId, points);
    }
    return acc;
  }, new Map());

  // Sort user scores
  const rank = [...scores.entries()].sort((a, b) => b[1] - a[1]);

  // Pretty print rank
  const fields = rank.map(item => {
    const [userId, points] = item;
    return {
      value: `<@${userId}> ..... ${points}`
    };
  });

  // Format response
  const attachments = [
    {
      fallback: `Total \`${challenge.metric}\` ..... ${activities.length}`,
      color: "#2eb886",
      text: `Total \`${challenge.metric}\` ..... ${activities.length}`
    },
    {
      fallback: "Leaderboard",
      title: "Leaderboard",
      color: "#2eb886",
      fields: fields
    }
  ];

  return attachments;
};
