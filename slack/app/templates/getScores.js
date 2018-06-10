export const getScoreBoard = challengeId => {
  // Todo: get scores from db

  // Format score board message attachment
  const scoreBoard = [
    {
      text: "Total team points: 5"
    },
    {
      title: "Score board",
      fields: [
        {
          value: "Jordan Chan ..... 5"
        },
        {
          value: "Martin Sitar .... 3"
        },
        {
          value: "Ian Tao ......... 1"
        }
      ]
    }
  ];

  return scoreBoard;
};
