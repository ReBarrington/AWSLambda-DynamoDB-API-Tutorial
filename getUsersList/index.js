// This function should return all items from DynamoDB

"use strict";
const AWS = require("aws-sdk");

// set region
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });

  let responseBody = {};
  let statusCode = 0;

  const params = {
    // describes the object we want to pull out of DynamoDB
    TableName: "Users",
  };

  try {
    responseBody = await documentClient.scan(params).promise();
    statusCode = 200;
  } catch (err) {
    responseBody = { message: "Unable to get user data.", error: err };
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myHeader: "test",
    },
    body: responseBody.Items.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
      };
    }),
  };

  return response;
};
