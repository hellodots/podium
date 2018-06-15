import { Challenge } from "../models/challenge";
import { Activity } from "../models/activity";

export class ChallengeView {
  static async create(req, res) {
    const {
      channelId,
      teamId,
      userId,
      title,
      metric1,
      metric2,
      metric3
    } = req.body;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }
    const teamChannelId = `${teamId}-${channelId}`;

    // Create metrics array with unique metrics provided
    const metrics = [
      ...new Set([metric1, metric2, metric3].filter(val => !!val))
    ];

    const newChallenge = new Challenge(
      teamChannelId,
      userId,
      title,
      metrics,
      true
    );

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
      const fetchedChallenge = await Challenge.getChallenge(
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
    let isActive = null;
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
    const { teamId, channelId, active, title, metrics } = req.body;

    // Team id and channel id are required
    if (!teamId || !channelId) {
      res.status(400).end("Team ID and Channel ID are required");
    }

    // Get existing challenge
    let fetchedChallenge;
    try {
      fetchedChallenge = await Challenge.getChallenge(
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

    if (title) {
      fetchedChallenge.title = title;
    }

    if (metrics) {
      fetchedChallenge.metrics = metrics;
    }

    // Update challenge
    try {
      const updatedChallenge = await fetchedChallenge.put();
      res.json(updatedChallenge).end();
    } catch (error) {
      res.status(400).end(error.message);
    }
  }

  static async getLeaderboard(req, res) {
    const { id: challengeId } = req.params;

    let activities;
    try {
      activities = await Activity.getActivities(challengeId);
    } catch (error) {
      res.status(400).end(error.message);
    }

    // Group activities by metric
    const metrics = activities.reduce((acc, activity) => {
      const { metric, teamUserId } = activity;
      // Split the userTeamId and get the userId
      const userId = teamUserId.split("-")[1];

      if (acc.has(metric)) {
        const scores = acc.get(metric);

        // TODO: Temp increment the number of points by 1 for each activity
        if (scores.has(userId)) {
          scores.set(userId, scores.get(userId) + 1);
        } else {
          scores.set(userId, 1);
        }
      } else {
        acc.set(metric, new Map([[userId, 1]]));
      }
      return acc;
    }, new Map());

    // Sort user scores
    const leaderboard = [...metrics.entries()].map(([metric, scores]) => {
      const sortedScores = [...scores.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([userId, score]) => ({ userId, score }));

      return {
        metric: metric,
        leaderboard: sortedScores
      };
    });

    return res.json(leaderboard).end();
  }
}
