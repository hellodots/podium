import { Activity } from "../models/activity";

export class ActivityView {
  static async create(req, res) {
    const { challengeId } = req.query;
    const { teamId, userId, deal } = req.body;

    // Challenge id, team id, and user id are required
    if (!challengeId || !teamId || !userId) {
      res.status(400).end("Challenge ID, Team ID and User ID are required");
    }

    const teamUserId = `${teamId}-${userId}`;
    const newActivity = new Activity(challengeId, teamUserId, deal);

    try {
      const createdActivity = await newActivity.put();
      res.json(createdActivity).end();
    } catch (error) {
      res.status(400).end(error.message);
    }
  }

  static async query(req, res) {
    res.status(501).end();
  }
}