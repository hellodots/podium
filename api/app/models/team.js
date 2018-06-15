import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { Model } from "./model";

const { TEAM_TABLE } = process.env;

export class Team extends Model {
  constructor(teamId, token, teamName) {
    super();
    this.teamId = teamId;
    this.token = token;
    this.teamName = teamName;
    this.createdAt = Date.now();
  }

  static async getTeam(teamId) {
    const fetchTeam = new Team(teamId);
    return fetchTeam.get();
  }
}

Object.defineProperties(Team.prototype, {
  [DynamoDbTable]: {
    value: TEAM_TABLE
  },
  [DynamoDbSchema]: {
    value: {
      teamId: {
        type: "String",
        keyType: "HASH"
      },
      token: { type: "String" },
      teamName: { type: "String" },
      createdAt: { type: "String" }
    }
  }
});
