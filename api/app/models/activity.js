import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";

import { Model } from "./model";

const { ACTIVITY_TABLE } = process.env;

export class Activity extends Model {
  constructor(challengeId, teamUserId, deal) {
    super();
    this.challengeId = challengeId;
    this.createdAt = Date.now();
    this.teamUserId = teamUserId;
    this.deal = deal;
  }
}

Object.defineProperties(Challenge.prototype, {
  [DynamoDbTable]: {
    value: ACTIVITY_TABLE
  },
  [DynamoDbSchema]: {
    value: {
      challengeId: {
        type: "String",
        keyType: "HASH"
      },
      createdAt: {
        type: "String",
        keyType: "RANGE"
      },
      teamUserId: { type: "String" },
      deal: { type: "String" }
    }
  }
});
