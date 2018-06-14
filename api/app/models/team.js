import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import { Model } from "./model";

const { TEAM_TABLE } = process.env;

export class Team extends Model {
  constructor(teamId, teamName, token) {
    super();
    this.teamId = teamId;
    this.token = token;
    this.teamName = teamName;
    this.createdAt = Date.now();
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
