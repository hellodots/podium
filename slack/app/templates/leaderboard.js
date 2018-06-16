export const formatLeaderboard = leaderboards =>
  leaderboards.map(leaderboard => {
    // Pretty print leaderboard
    const fields = leaderboard.leaderboard.map(({ userId, score }) => ({
      value: `<@${userId}> ..... ${score}`
    }));

    return {
      fallback: `${leaderboard.metric} leaderboard`,
      title: `${leaderboard.metric} leaderboard (TOTAL: ${leaderboard.total})`,
      color: "#2eb886",
      fields: fields
    };
  });
