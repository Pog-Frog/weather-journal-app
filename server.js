const express = require("express")
const app = express();
const cors = require("cors");
const port = 8000;
const bodyParser = require("body-parser");
projectData = {};


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// Setup empty JS object to act as endpoint for all routes
app.use(express.static("website"));

function getAll(req, res) {
    res.send(projectData);
}

function postData (req, res){
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);
}

app.post("/add", postData);

app.get("/all", getAll);

function listening(){
    console.log(`server starting at ${port}`);
}

app.listen(port, listening);
// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.


// Cors for cross origin allowance

// Initialize the main project folder


// Setup Server