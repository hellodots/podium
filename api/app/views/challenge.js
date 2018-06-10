import { Challenge } from "../models/challenge";

export class ChallengeView {
  static async create(req, res) {
    const { channelId, teamId, userId, metric } = req.body;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }

    const teamChannelId = `${teamId}-${channelId}`;
    const newChallenge = new Challenge(teamChannelId, userId, metric, true);

    try {
      const createdChallenge = await newChallenge.put();
      res.json(createdChallenge).end();
    } catch (error) {
      res.status(400).end(error.message);
    }
  }

  static async query(req, res) {
    const { teamId, channelId, active } = req.query;

    // TODO: implement error if no query params
    // If no query params, return a blank list
    if (!teamId || !channelId) {
      res.json([]).end();
    }

    // Check if 'active' param is passed in
    let isActive;
    if (active) {
      isActive = active === "1" ? true : false;
    }

    try {
      const challenges = await Challenge.query(
        `${teamId}-${channelId}`,
        isActive
      );
      res.json(challenges).end();
    } catch (error) {
      console.log(error);
      res.status(400).end(error.message);
    }
  }

  static async get(req, res) {
    const { id: challengeID } = req.params;
    const { teamId, channelId } = req.query;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }

    const toFetchChallenge = new Challenge(`${teamId}-${channelId}`);
    toFetchChallenge.challengeId = challengeID;

    try {
      const fetchedChallenge = await toFetchChallenge.get();
      res.json(fetchedChallenge).end();
    } catch (error) {
      console.log(error);
      res.status(400).end(error.message);
    }
  }
}
