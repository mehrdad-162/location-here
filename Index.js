// install npm init ,  npm install express ,  npm install nedb
// installing express and writing following code to serve any HTML file in the Public folder
const express = require("express");
const { response, request } = require("express");

const app = express();

const port = process.env.PORT || 4000;
// pick port and callback function
app.listen(port, () => {
  console.log(`server listening at ${port} or 4000`);
});

// use express to host static file
// serve the put the HTML Page in public folder for serving by express
app.use(express.static("public"));

//
const database = [];
//

// we are seting Application Programming Interface API
// Post command receive the data from client side
// Post  include where do I receive the post => address="/api" callback function variable request hold whole information and data in callback function and response variable is the response that will be sent to client
// request Variable has whole information that we receive
// response Variable has whole inforamtion that to be sent to client
// also we need to put the below command to indicate the type of data is in JSON format
app.use(express.json({ limit: "1mb" }));
const datastore = require("nedb");

// Dotenv
require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it is working

// create the database and load database
const nedatabase = new datastore("nedatabase.db");
nedatabase.loadDatabase();
// example of insert function
// nedbdatabase.insert({ name: "mehrdad" });

app.post("/api", (request, response) => {
  console.log("I got a request!");
  // console.log(request);
  console.log("This is the information receive from Client", request.body);
  // console.log(response);

  // define the request body of information
  const data = request.body;

  //
  database.push(data);
  console.log("Coordination Database: ", database);
  //

  console.log("index.js receive the Data: ", data);
  nedatabase.insert(data);

  // as we said the send back that the information receive from client
  response.json({
    status: "success",
    // or we can say request.body.lat or request.body.lon
    info: data,
    latitude: data.lat,
    longitude: data.lon,
    mood: data.mood,
  });
});

// get data
app.get("/api", (request, response) => {
  nedatabase.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      response.json(data);
    }
  });
});
