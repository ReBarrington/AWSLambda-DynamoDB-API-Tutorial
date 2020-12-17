# AWS Lambda & DynamoDB Tutorial

[YouTube Tutorial by Cloud Path Here](https://www.youtube.com/watch?v=ijyeE-pXFk0&t=1939s)

A step-by-step tutorial on how to write AWS Lambda functions in NodeJS to get and set data in DynamoDB.
We will create a Users table with two lambda functions: GetUserData and PutUserData.

## Getting Started
- Create a table in DynamoDB: `Users`
    - Primary Key can be id, a string
    - Add 1 item to the table
- Create an IAM role to give our lambda permissions to work with the table
    - You will need the ARN from the table's overview
    - Create Role
        - AWS service
        - Lambda
        - Permissions: `AWSLambdaBasicExecutionRole`
        - Keys: optional. But useful if you have lots of roles and want to organize/search
        - Add Inline Policy to Role after creation
            - Service: DynamoDB
            - Actions: GetItem, PutItem
            - Resources: specific, paste in ARN
            - name policy
- Create Lambda Function
    - Use the exisiting role just created.
    - The Designer Tab allows you to specify triggers (We will set up API Gateway later)
    - Not recommended to edit code directly in the interface. Use VSC.
    - `AWS Lambda Boilerplate Snippets` is a recommended extension
        - `lambda-aws` will scaffold a starting function
    - `aws-sdk` is imported 
    - You can view the [DynamoDB API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) to better understand how to retrieve items from it. Search for `GetItem` to learn how to model the `getUserData` function
    - After function has been written. Copy and paste to Lambda interface.
- Test Lambda Function
    - Configure Test Event, deploy, test
- `npm i @aws-sdk/client-dynamodb` and `const {DynamoDBClient} = require("@aws-sdk/cient-dynamodb")`