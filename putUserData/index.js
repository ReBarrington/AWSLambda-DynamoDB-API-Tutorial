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

  let responseBody = "";
  let statusCode = 0;

  // extract properties from request body
  const { id, firstname, lastname } = JSON.parse(event.body);

  const params = {
    // describes the object we want to pull out of DynamoDB
    TableName: "Users",
    Item: {
      id: id,
      firstname: firstname,
      lastname: lastname,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = "Unable to put user data.";
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "json/application",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: responseBody
  };

  return response;
};
