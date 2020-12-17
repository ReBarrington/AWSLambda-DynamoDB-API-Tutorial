# AWS Lambda & DynamoDB Tutorial

[YouTube Tutorial Here](https://www.youtube.com/watch?v=ijyeE-pXFk0&t=1939s)

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
        