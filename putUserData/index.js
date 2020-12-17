// This function should add an item to DynamoDB

"use strict";
const AWS = require("aws-sdk");

// set region
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });
  const params = {
    // describes the object we want to pull out of DynamoDB
    TableName: "Users",
    Item: {
      id: "67890",
      firstname: "Bob",
      lastname: "Johnson",
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
