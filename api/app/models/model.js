import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB from "aws-sdk/clients/dynamodb";

const IS_OFFLINE = process.env.IS_OFFLINE;

let client;
if (IS_OFFLINE === "true") {
  client = new DynamoDB({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
} else {
  client = new DynamoDB();
}

const mapper = new DataMapper({ client });

export class Model {
  put() {
    return mapper.put({ item: this });
  }
}
