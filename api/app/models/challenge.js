import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import uuidv4 from "uuid/v4";

import { Model } from "./model";

const { CHALLENGE_TABLE } = process.env;

export class Challenge extends Model {
  constructor(teamChannelId, userId, metric, active = true) {
    super();
    this.teamChannelId = teamChannelId;
    this.createdAt = Date.now();
    this.challengeId = uuidv4();
    this.userId = userId;
    this.metric = metric;
    this.active = active;
  }
}

Object.defineProperties(Challenge.prototype, {
  [DynamoDbTable]: {
    value: CHALLENGE_TABLE
  },
  [DynamoDbSchema]: {
    value: {
      teamChannelId: {
        type: "String",
        keyType: "HASH"
      },
      createdAt: {
        type: "String",
        keyType: "RANGE"
      },
      challengeId: {
        type: "String",
        defaultProvider: uuidv4
      },
      userId: { type: "String" },
      metric: { type: "String" },
      active: {
        type: "Boolean",
        defaultProvider: true
      }
    }
  }
});
