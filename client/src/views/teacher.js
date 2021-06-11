import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import QuestionBox from "../components/Teacher/QuestionBox";
import { render } from "@testing-library/react";
import { createMuiTheme } from "@material-ui/core/styles";
import ResultBox from "../components/Teacher/Result";
const myTheme = createMuiTheme();
const styles = (theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: " rgb(100, 100, 255)",
    padding: myTheme.spacing(2),
  },
  more: {
    backgroundColor: "green",
    marginRight: myTheme.spacing(2),
  },
});

class MakeQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      count: 0,
      questions: [],
      UID: "",
      result: false,
    };
    this.addQuestion = this.addQuestion.bind(this);
    this.questionChanged = this.questionChanged.bind(this);
    this.answersChanged = this.answersChanged.bind(this);
    this.correctChanged = this.correctChanged.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
  }

  componentDidMount() {
    this.addQuestion();
  }

  addQuestion() {
    var questions = this.state.questions;
    questions.push({
      question: "",
      answers: ["", "", "", ""],
      correct: "",
    });
    this.setState({
      questions: questions,
    });
  }

  async submitQuiz() {
    var body = {
      questions: this.state.questions,
    };
    await axios
      .post("api/postquiz", body)

      .then((response) => {
        //Go to the takequiz page and send the questions
        this.setState({
          UID: response.data.uid,
          result: true,
        });
      })
      //Show error if quiz not found
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error)
          this.setState({
            error: error.response.data.error,
          });
      });
  }

  answersChanged(id, answers) {
    var questions = this.state.questions;
    questions[id].answers = answers;
    this.setState({ questions: questions });
  }
  correctChanged(id, correct) {
    var questions = this.state.questions;
    questions[id].correct = correct;
    this.setState({ questions: questions });
  }
  questionChanged(id, question) {
    var questions = this.state.questions;
    questions[id].question = question;
    this.setState({ questions: questions });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.state.error && (
          <Typography variant="h5">ERROR: {this.state.error}</Typography>
        )}

        {this.state.result ? (
          <ResultBox id={this.state.UID} />
        ) : (
          this.state.questions.map((object, index) => (
            <QuestionBox
              key={index}
              question={object.question}
              answers={object.asnwers}
              correct={object.correct}
              index={index}
              answersChanged={this.answersChanged}
              questionChanged={this.questionChanged}
              correctChanged={this.correctChanged}
            />
          ))
        )}
        {!this.state.result ? (
          <>
            <Button
              className={classes.more}
              type="button"
              variant="contained"
              color="primary"
              onClick={this.addQuestion}
            >
              Add More
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={this.submitQuiz}
            >
              Create Quiz
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(MakeQuiz);
