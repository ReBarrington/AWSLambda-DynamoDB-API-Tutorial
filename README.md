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

## Amazon API Gateway
- We're using API Gateway to create a simple REST API to interact with our lambda functions to get/set user data. 
- API Gateway will call our lambda functions, which will in turn get/set data in the database.
- Select build REST API
- Edge optimized 
- Actions > Create Resource
- Actions > Create Method
    - GET
        - Checking the `Use Lambda Proxy Integration` box will allow access to request parameters/body
        - Choose Lambda Function: `getUserData`
        - Clicking `Method Request` will allow extra options
            - Authorization: `AWS_IAM` allows you to create authorization on who can access API
            - `Request Validator`: `Validate body, query string parameters, and headers`
        - Add `content-type` header
    - test endpoint with query strings and header: `content-type: application/json`

    - POST
        - Let's create a new model
        - [Link to API Gateway models docs](https://www.youtube.com/redirect?redir_token=QUFFLUhqa3VjS1RQTTN5b295Qk0xVjM1amhvVzFyZEhDZ3xBQ3Jtc0tsN1hGR1Z4ZzJMLXBUUHRneU92aFRFcUpuaDUyTGMwRlJFYmoxS01JWmo1TGtYMEUtQWVyLThmVnJRcDZWMWp1U1FfbHBUNVVqTl9zaDlhXzdOdWpOZFFrZ1kyTDgwcy1rTEt3Nlh2TER3SFBNSkhQMA%3D%3D&q=https%3A%2F%2Fdocs.aws.amazon.com%2Fapigateway%2Flatest%2Fdeveloperguide%2Fmodels-mappings.html&v=Tc1YIOAbyS0&event=video_description)
        - After creating model, add to request body in POST settings