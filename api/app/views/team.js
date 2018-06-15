import { Team } from "../models/team";

export class TeamView {
  static async create(req, res) {
    const { teamId, token, teamName } = req.body;

    // Team id is required
    if (!teamId) {
      res.status(400).end("Team ID is required");
    }

    const newTeam = new Team(teamId, token, teamName);

    try {
      const createdTeam = await newTeam.put();
      res.json(createdTeam).end();
    } catch (error) {
      res.status(400).end(error.message);
    }
  }

  static async get(req, res) {
    const { id: teamId } = req.params;

    try {
      const fetchedTeam = await Team.getTeam(teamId);
      res.json(fetchedTeam).end();
    } catch (error) {
      console.log(error);
      res.status(400).end(error.message);
    }
  }
}
