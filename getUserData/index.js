// This function should return an item from DynamoDB

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
    Key: {
      id: "12345",
    },
  };

  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
