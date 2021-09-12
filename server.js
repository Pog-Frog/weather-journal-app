const express = require("express")
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Setup empty JS object to act as endpoint for all routes
projectData = {};
app.use(express.static("website"));
function getAll(req, res) {
    res.status(200).send(projectData);
}
app.get("/all", getAll);
function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
}
app.post("/add", postData);
const port = 4000;
const hostname = "127.0.0.1";
function listening() {
    console.log("server starting at https://${hostname}:${port}/");
}
app.listen(port, listening);
// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server