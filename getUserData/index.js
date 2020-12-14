// lambda aws extension makes boilerplate.
// handler will be index.handler
// this tutorial is using the dynamoDB


'use strict'
const AWS = require('aws-sdk');

// set region
AWS.config.update({ region: "us-east-1" })

exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const params = {
        TableName: "Users",
        Key: {
            id: {
                s: "12345"
            }
        }
    }
}