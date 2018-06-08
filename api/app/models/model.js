import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB from "aws-sdk/clients/dynamodb";
import AWS from "aws-sdk";

const IS_OFFLINE = process.env.IS_OFFLINE;

let client;
// HACK: temp solution for querying on the model
let dynamoDb;

if (IS_OFFLINE === "true") {
  client = new DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });

  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
} else {
  client = new DynamoDB();

  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

const mapper = new DataMapper({ client });

export class Model {
  put() {
    return mapper.put({ item: this });
  }

  // HACK: temp solution for querying on the model
  static query(table, expression, values) {
    const params = {
      TableName: table,
      KeyConditionExpression: expression,
      ExpressionAttributeValues: values
    };

    return new Promise((resolve, reject) => {
      dynamoDb.query(params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.Items);
        }
      });
    });
  }
}
