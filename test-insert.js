const mongo = require("./mongo");
var db = mongo.getDb();
const uid = require("uid");
const questions = [
  {
    question: "What is 3 + 2?",
    answers: ["3", "4", "5", "10"],
    correct: "5",
    id: "2222",
  },

  {
    question: "What is 10/2?",
    answers: ["30", "40", "5", "4"],
    correct: "5",
    id: "4444",
  },
  {
    question: "What is 2 + 1?",
    answers: ["3", "4", "5", "10"],
    correct: "3",
    id: "3333",
  },
  {
    question: "What is 520 x 432?",
    answers: ["224,640", "214,213", "312,640", "224,650"],
    correct: "224,640",
    id: "5555",
  },
];

const id = uid();
db.collection("quizzes").insertOne(
  { UID: id, questions: questions },
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("quiz inserted successfully!");
  }
);
