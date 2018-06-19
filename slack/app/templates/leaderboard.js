export const formatLeaderboard = leaderboards =>
  // TODO: If ending challenge, use 1st, 2nd, 3rd place medal emoji

  leaderboards.map(leaderboard => {
    // Pretty print leaderboard
    const fields = leaderboard.leaderboard.map(({ userId, score }, index) => ({
      value: `#${index + 1}: <@${userId}> (${score})`
    }));

    return {
      fallback: `${leaderboard.metric}`,
      title: `${leaderboard.metric} (Total: ${leaderboard.total})`,
      color: "#2eb886",
      fields: fields
    };
  });
