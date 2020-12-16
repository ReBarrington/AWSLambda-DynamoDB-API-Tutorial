// This file contains all the functions and what they're going to do (CRUD)

"use strict";

// npm install aws-sdk --save
// event refers to api gateway here

module.exports = {
  // create a new kitten
  create: async (event, context) => {
    let bodyObj = {};
    try {
      // check for json body
      bodyObj = JSON.parse(event.body);
    } catch (jsonError) {
      // console.log will only appear in CloudWatch logs
      console.log("There was an error parsing the body.", jsonError);
      return {
        statusCode: 400,
      };
    }

    // kitten must have name and age
    if (
      typeof bodyObj.name === "undefined" ||
      typeof bodyObj.age === "undefined"
    ) {
      console.log("Missing parameters.");
      return {
        statusCode: 400,
      };
    }

    // using aws-sdk for DynamoDB
    let putParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Item: {
        name: bodyObj.name,
        age: bodyObj.age,
      },
    };

    let putResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      putResult = await dynamodb.put(putParams).promise();
    } catch (putError) {
      console.log("There was a problem putting the kitten");
      console.log("putParams", putParams);
      return {
        statusCode: 500,
      };
    }

    // no problems- kitten created!
    return {
      statusCode: 201,
    };
  },

  list: async (event, context) => {
    let scanParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
    };

    let scanResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      scanResult = await dynamodb.scan(scanParams).promise();
    } catch (scanError) {
      console.log("There was a problem scanning the kittens");
      console.log("scanError", scanError);
      return {
        statusCode: 500,
      };
    }

    // make sure there are items to list
    if (
      scanResult.Items === null ||
      !Array.isArray(scanResult.Items) ||
      scanResult.Items.length === 0
    ) {
      return {
        statusCode: 404,
      };
    }

    // no problems - here's a list of kittens!
    return {
      statusCode: 200,
      body: JSON.stringify(
        scanResult.Items.map((kitten) => {
          return {
            name: kitten.name,
            age: kitten.age,
          };
        })
      ),
    };
  },

  get: async (event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
    };

    let getResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      getResult = await dynamodb.get(getParams).promise();
    } catch (getError) {
      console.log("There was a problem getting the kitten");
      console.log("getError", getError);
      return {
        statusCode: 500,
      };
    }

    if (getResult.Item === null) {
      return {
        statusCode: 404,
      };
    }

    // no problems - that kitten exists, here it is:
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: getResult.Item.name,
        age: getResult.Item.age,
      }),
    };
  },

  update: async (event, context) => {
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(event.body);
    } catch (jsonError) {
      console.log("There was an error parsing the body", jsonError);
      return {
        statusCode: 400,
      };
    }

    let updateParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
      // tells DynamoDB what we are updating:
      UpdateExpression: "set #age = :age",
      ExpressionAttributeName: {
        "#age": "age",
      },
      ExpressionAttributeValues: {
        ":age": bodyObj.age,
      },
    };

    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      dynamodb.update(updateParams).promise();
    } catch (updateError) {
      console.log("There was an error updating the kitten");
      console.log("updateError", updateError);
      return {
        statusCode: 500,
      };
    }

    return {
      statusCode: 200,
    };
  },

  delete: async (event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_KITTEN_TABLE,
      Key: {
        name: event.pathParameters.name,
      },
    };

    let deleteResult = {};
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient();
      deleteResult = await dynamodb.delete(deleteParams).promise();
    } catch (deleteError) {
      console.log("There was a problem deleting the kitten");
      console.log("deleteError", deleteError);
      return {
        statusCode: 500,
      };
    }

    // no problems - that kitten exists, here it is:
    return {
      statusCode: 200,
    };
  },
};

// https://www.youtube.com/watch?v=LXB2Nv9ygQc 36:56
