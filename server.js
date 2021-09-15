const express = require("express");
// Require Express to run server and routes
const app = express();
const cors = require("cors");
const port = 8000;
const bodyParser = require("body-parser");
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server

// Cors for cross origin allowance
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

function getAll(req, res) {
  res.send(projectData);
}

function postData(req, res) {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
  
}

app.post("/add", postData);

app.get("/all", getAll);

// Start up an instance of app
app.listen(port, listening);

function listening() {
  console.log(`server starting at ${port}`);
}
