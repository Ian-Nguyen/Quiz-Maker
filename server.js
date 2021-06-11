const express = require("express");
const path = require("path");
const mongo = require("./mongo");
var bodyParser = require("body-parser");
const uid = require("uid");

var db = mongo.getDb();
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//Serves the get quiz request recieved from our client.
app.post("/api/getquiz", (req, res) => {
  //Get the ID that user entered
  var id = escape(req.body.id);

  //Attempt to find the quiz with ID provided
  db.collection("quizzes").findOne({ UID: id }, (err, response) => {
    if (err) console.log(err);
    //If no quiz found send error
    if (!response || !response.questions) {
      res.status(400).send({ error: "No results found!" });
      return;
    }

    //otherwise send the quiz
    res.send(response);
  });
});

app.post("/api/postquiz", (req, res) => {
  //Get the ID that user entered
  var questions = req.body.questions;
  const id = uid();

  //Attempt to find the quiz with ID provided
  db.collection("quizzes").insertOne(
    { UID: id, questions: questions },
    (err, response) => {
      if (err) {
        res
          .status(400)
          .send({ error: "Could not create quiz! Please Try again" });
      }
      //If no quiz found send error

      //otherwise send the quiz
      res.send({ uid: id });
    }
  );
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
