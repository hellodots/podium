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
