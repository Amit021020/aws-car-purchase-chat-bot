# AWS Lex Configuration

## Bot Configuration

- Bot Name: CarPurchaseBot
- Service: Amazon Lex V2
- Locale: English (US)
- Locale ID: en_US
- Region: us-east-1

## Main Intent

### OrderCar

The OrderCar intent handles the main car purchasing conversation.

The intent collects the following information:

1. Customer Name
2. Email Address
3. Contact Number
4. Address
5. Car Model
6. Car Colour
7. Delivery Date

## Custom Slot Types

### CarModel

A custom slot type was created for the available car models.

The chatbot contains more than 20 car models with corresponding prices.

### CarColour

The chatbot allows the customer to select a vehicle colour.

### DeliveryDate

The delivery date is collected from the customer and validated through AWS Lambda.

## Synonyms

Car model synonyms were configured to allow the chatbot to recognize commonly used names and shortened forms of vehicle models.

## Fallback Intent

A fallback intent was configured to handle unsupported or unrecognized user input.

## Fulfillment

AWS Lambda was configured as the fulfillment mechanism for the OrderCar intent.

The Lambda function:

- Validates the delivery date
- Processes the selected car
- Determines the car price
- Generates a unique order ID
- Returns the order confirmation

## Lambda Function

Function Name:

`CarOrderProcessor`

## Local Application

The chatbot was also tested through a locally hosted Node.js and Express.js application.

The local application communicates with Amazon Lex V2 using the AWS SDK.

## Testing

The following scenarios were tested:

- Successful car order
- Car model selection
- Slot filling
- Car model synonyms
- Invalid delivery date
- Fallback intent
- Order confirmation
- Local platform testing

## AWS Resource Status

The Amazon Lex bot and AWS Lambda function were deployed and tested during project development.

The AWS resources were removed after project completion to avoid unnecessary AWS usage and potential charges.

Screenshots of the completed AWS configuration and testing are included in the `screenshots` directory.