import { Challenge } from "../models/challenge";

export class ChallengeView {
  async create(req, res) {
    const { channelId, teamId, userId, metric } = req.body;

    const teamChannelId = `${teamId}-${channelId}`;
    const newChallenge = new Challenge(teamChannelId, userId, metric, true);

    let createdChallenge;
    try {
      createdChallenge = await newChallenge.put();
    } catch (error) {
      res.status(400).end(error.message);
      return;
    }

    res.json(createdChallenge).end();
  }
}
