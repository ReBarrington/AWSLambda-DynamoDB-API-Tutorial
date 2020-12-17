"use strict";
const AWS = require("aws-sdk");

// set region
AWS.config.update({ region: "us-east-1" });

exports.handler = function (event, context) {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const params = {
    TableName: "Users",
    Key: {
      id: {
        s: "12345",
      },
    },
  };
};
