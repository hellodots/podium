import { DynamoDbSchema, DynamoDbTable } from "@aws/dynamodb-data-mapper";
import uuidv4 from "uuid/v4";

import { Model } from "./model";

const { ACTIVITY_TABLE } = process.env;

export class Activity extends Model {
  constructor(challengeId, teamUserId, deal) {
    super();
    this.challengeId = challengeId;
    this.activityId = uuidv4();
    this.createdAt = Date.now();
    this.teamUserId = teamUserId;
    this.deal = deal;
  }

  // HACK: temp solution for querying on the model
  static query(challengeId, teamUserId = null) {
    // Check if teamUserId value has been passed in
    let values = { ":c": challengeId };
    let filters = null;
    if (teamUserId !== null) {
      filters = "teamUserId = :tu";
      values[":tu"] = teamUserId;
    }

    const expression = "challengeId = :c";
    return super.query(ACTIVITY_TABLE, expression, filters, values);
  }

  static async getActivities(challengeId, teamId, userId) {
    // Check is teamId and userId are pased in
    let teamUserId = null;
    if (teamId && userId) {
      teamUserId = `${teamId}-${userId}`;
    }

    return Activity.query(challengeId, teamUserId);
  }
}

Object.defineProperties(Activity.prototype, {
  [DynamoDbTable]: {
    value: ACTIVITY_TABLE
  },
  [DynamoDbSchema]: {
    value: {
      challengeId: {
        type: "String",
        keyType: "HASH"
      },
      activityId: {
        type: "String",
        keyType: "RANGE",
        defaultProvider: uuidv4
      },
      createdAt: { type: "String" },
      teamUserId: { type: "String" },
      deal: { type: "String" }
    }
  }
});
