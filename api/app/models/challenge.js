import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import uuidv4 from "uuid/v4";

import { Model } from "./model";

const { CHALLENGE_TABLE } = process.env;

export class Challenge extends Model {
  constructor(teamChannelId, userId, metric, active = true) {
    super();
    this.teamChannelId = teamChannelId;
    this.challengeId = uuidv4();
    this.createdAt = Date.now();
    this.userId = userId;
    this.metric = metric;
    this.active = active;
  }

  // HACK: temp solution for querying on the model
  static query(teamChannelId, active = null) {
    // Check that an 'active' value has been passed in
    let values = { ":tc": teamChannelId };
    let filters = null;
    if (active !== null) {
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
      challengeId: {
        type: "String",
        keyType: "RANGE",
        defaultProvider: uuidv4
      },
      createdAt: { type: "String" },
      userId: { type: "String" },
      metric: { type: "String" },
      active: {
        type: "Boolean",
        defaultProvider: true
      }
    }
  }
});
