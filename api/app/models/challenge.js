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

  // HACK: temp solution for querying on the model
  static query(teamChannelId, active) {
    // Check that an 'active' value has been passed in
    let values = { ":tc": teamChannelId };
    let filters = null;
    if (active !== undefined) {
      filters = "active = :a";
      values[":a"] = active;
    }

    const expression = "teamChannelId = :tc";
    return super.query(CHALLENGE_TABLE, expression, filters, values);
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
