import { requestUtil } from "../request";

export const help = url => {
  const message = {
    text:
      "Oops! I didn't recognize that command. Here are the ones that I know:",
    attachments: [
      {
        fallback: "Organize a challenge",
        title: "Organize a challenge",
        text:
          "Type `/podium start` to start a new challenge or `/podium end` to, well, you can probably guess :stuck_out_tongue_winking_eye:."
      },
      {
        fallback: "Participate in a challenge",
        title: "Participate in a challenge",
        text:
          "Type `/score [deal name]` to record your progress and `/podium rank` to view the leaderboard."
      }
    ]
  };
  return requestUtil.post(url, message);
};
