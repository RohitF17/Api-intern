Overview

The goal of this service is to provide a simple, scalable, and efficient way to ingest and query transaction data from a personal banking app. The service uses a basic bank customer-centric relational database to store the data and provides a set of RESTful APIs
That can be used to interact with the database



Prerequisites

To run this service, you will need the following:
Node.js and npm
MYSQL2
A MYSQL database (local or remote)



Installation

To install this service,follow these steps:

1. Clone the repository from Github:
git clone   https://github.com/RohitF17/Api-intern.git

2. Install the dependencies:
cd API-Intern
npm install

3. Create a Connection to the Mysql DataBase:


->change the user, password and database accordingly to the requirement of the created database 

->Once Created and Connected to the database this service can be started 

4. Start the service
npm start
->use this command to start the service 
The service will now be running on http://localhost:3000

API Reference

The service provides the following APIs:



Ingest Data
URL :  /createCustomer
Method: `POST`
Auth required: No
Data constraints
{
    "customer_id": <int>,
    "transaction_amount": <float>,
    "mobile_no": <string>,
    "transaction_datetime": <datetime>,
    "pincode": <string>
}
Data Example

Success response
Code :`200 OK`
Content example





Get Customer Info
URL : `/displayCustomer`
Method:`GET`
Auth require: NO
Query parameters
`val1`: The minimum/maximum transaction amount to filter by 
`val2`:The minimum/maximum transaction amount to filter by 
Sucess response
Code:`200 ok`








Get Top 5 CustomerInfo
URL:`/displayTopcustomers`
Method: `GET`
Auth required: No
Query parameters
`state`: Enter the state in which you need to get the following pincodes
->only punjab and telangana test dummy pincodes were tested in the database



->unfortunately it cant retrieve top 5 but puts all the records for punjab pincodes in descending order and grouped 






