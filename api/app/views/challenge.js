import { Challenge } from "../models/challenge";

const fetchChallenge = (teamChannelId, challengeId) => {
  const toFetchChallenge = new Challenge(teamChannelId);
  toFetchChallenge.challengeId = challengeId;
  return toFetchChallenge.get();
};

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

  static async get(req, res) {
    const { id: challengeId } = req.params;
    const { teamId, channelId } = req.query;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }

    try {
      const fetchedChallenge = await fetchChallenge(
        `${teamId}-${channelId}`,
        challengeId
      );
      res.json(fetchedChallenge).end();
    } catch (error) {
      console.log(error);
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

  static async update(req, res) {
    const { id: challengeId } = req.params;
    const { teamId, channelId } = req.query;

    const { active, metric } = req.body;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }

    // Get existing challenge
    let fetchedChallenge;
    try {
      fetchedChallenge = await fetchChallenge(
        `${teamId}-${channelId}`,
        challengeId
      );
    } catch (error) {
      console.log(error);
      res.status(400).end(error.message);
    }

    // Set new attributes
    if (active !== undefined) {
      fetchedChallenge.active = active;
    }

    if (metric) {
      fetchedChallenge.metric = metric;
    }

    // Update challenge
    try {
      const updatedChallenge = await fetchedChallenge.put();
      res.json(updatedChallenge).end();
    } catch (error) {
      res.status(400).end(error.message);
    }
  }
}
