export const formatLeaderboard = leaderboards =>
  leaderboards.map(leaderboard => {
    // Pretty print leaderboard
    const fields = leaderboard.map((userId, score) => ({
      value: `<@${userId}> ..... ${score}`
    }));

    return {
      fallback: `${leaderboard.metric} leaderboard`,
      title: `${leaderboard.metric} leaderboard`,
      color: "#2eb886",
      fields: fields
    };
  });
