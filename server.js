// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {
};

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require('cors');
// Enable All CORS Requests
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.listen(port, () => {
    console.log(`The server is running on port: ${port}`)
});


//GET route to send the data back to the client side to be used to update the UI
app.get("/getData" , (req, res) => {
    console.log(projectData);
    res.send(projectData);
});


//POST route to to get the data from the client side to store it in the server end point
app.post('/all', (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
});


