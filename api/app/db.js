import AWS from "aws-sdk";

const { ACTIVITY_TABLE, CHALLENGE_TABLE, IS_OFFLINE } = process.env;

class db {
  constructor(db) {
    this.db = db;
  }
}

class dynamoDB extends db {
  constructor(db) {
    super(db);
  }

  createChallenge(channelId, teamId, userId, metric, duration) {
    return new Promise((resolve, reject) => {
      resolve({ id: "test" });
    });
  }
}

let client;
if (IS_OFFLINE === "true") {
  client = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
} else {
  client = new AWS.DynamoDB.DocumentClient();
}
export const dynamoDBUtil = new dynamoDB(client);
