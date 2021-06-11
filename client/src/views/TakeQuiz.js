import React, { Component } from "react";
import quizService from "../API/quizService";
import QuizSelection from "../components/QuizSection";
import { withStyles } from "@material-ui/styles";
import { Box, Container } from "@material-ui/core";
import QuizResult from "../components/QuizResult";
import CopyRight from "../components/CopyRight";

//Define Styles. Written in JSS. Uses Material-UI's withSytles function to create JSS styles.
const styles = (theme) => ({
  root: {
    backgroundColor: "rgb(100, 100, 255)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  quizContainer: {
    backgroundColor: "White",
    padding: "2rem",
  },
  header: {
    backgroundColor: "#2e2e2e",
    padding: "2rem",
    color: "white",
  },
  id: {
    color: "#ff6b30",
    fontSize: "2rem",
  },
});
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
class TakeQuiz extends Component {
  //Constructor. Initiate Props using Component consturctor (super)
  constructor(props) {
    super(props);

    //States store variables that can be modified while the page is showing. When states are modified,
    //Dom is re-rendered and the modifed tags reload to display new data.

    //For this reason we store each question as state
    this.state = {
      quizID: "",
      index: 0,
      score: 0,
      id: 0,
      question: "",
      answers: [],
      correct: "",
      result: false,
    };
  }

  //Get question from API or the backend code.
  getQuestions = () => {
    //set class variable questions to the results returned from api. (this.questions)
    try {
      this.questions = this.props.location.state.questions;
      this.setState({ quizID: this.props.location.state.quizID });
      this.getNextQuestion();
    } catch (e) {
      this.props.history.push("/student");
    }
  };

  //Uses the index to get the next question and updates state. When state is updated, react will show the new question and answers
  getNextQuestion() {
    const index = this.state.index;
    console.log(index);
    this.setState({
      question: this.questions[index].question,
      answers: shuffle(this.questions[index].answers),
      correct: this.questions[index].correct,
      id: this.questions[index].id,
    });
  }

  //ComponentDidMount is called by react once page is ready. Here we call getQuestions once page is done loading.
  componentDidMount() {
    this.getQuestions();
  }

  //Checks selected answer agaist correct answer if it is correct the state key score is incremented by one.
  checkAnswer(answer, correct) {
    if (answer === correct) {
      this.setState({
        score: this.state.score + 1,
      });
    } else {
    }
    var nextIndex = this.state.index + 1;
    if (nextIndex < this.questions.length) {
      this.setState({
        index: nextIndex,
      });

      //Add a timeout so user has some time to see what answer they have selected before new question loads
      setTimeout(() => this.getNextQuestion(), 500);
    } else {
      //If we are past the last question, show the result
      this.setState({
        result: true,
      });
    }
  }

  //Render method contains all data we want to display on page.
  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.root}>
        <Container maxWidth="md" className={classes.header}>
          Quiz ID: <span className={classes.id}>{this.state.quizID}</span>
        </Container>
        <Container maxWidth="md" className={classes.quizContainer}>
          {/* if we have the result show quizResult component, Otherwise show QuizSelection component */}
          {this.state.result ? (
            <QuizResult
              correct={this.state.score}
              size={this.questions.length}
            />
          ) : (
            <QuizSelection
              question={this.state.question}
              options={this.state.answers}
              key={this.state.id}
              id={this.state.id}
              selected={(answer) => {
                this.checkAnswer(answer, this.state.correct);
              }}
            />
          )}
        </Container>
        {/* Display the copyright component */}
        <CopyRight />
      </Box>
    );
  }
}

export default withStyles(styles)(TakeQuiz);
