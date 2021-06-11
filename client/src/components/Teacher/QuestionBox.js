import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    boxSizing: "border-box",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: theme.spacing(2),
  },
  title: {
    backgroundColor: "#ffdcdc",
    padding: theme.spacing(2),
  },
  options: {
    padding: theme.spacing(2),

    margin: "0",
  },
  option: {
    marginBottom: theme.spacing(3),
  },
}));

export default function QuestionBox(props) {
  const classes = useStyles();
  const [error, setError] = useState();
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [id, setId] = useState(props.index);
  const questionChanged = (event) => {
    props.questionChanged(id, event.target.value);
  };
  const answersChanged = (event) => {
    if (!["0", "1", "2", "3"].includes(event.target.name)) return;
    var answersTemp = answers;
    answersTemp[event.target.name] = event.target.value;
    setAnswers(answersTemp);
    props.answersChanged(id, answers);
    if (event.target.name == 0) {
      props.correctChanged(id, answers[0]);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <TextField
          fullWidth
          label="Question Title"
          onChange={questionChanged}
        />
      </Box>
      <Box className={classes.options}>
        <TextField
          fullWidth
          variant="outlined"
          label="Correct Answer"
          name="0"
          onChange={answersChanged}
          className={classes.option}
        />

        <TextField
          fullWidth
          variant="outlined"
          name="1"
          label="Incorrect Answer 1"
          onChange={answersChanged}
          className={classes.option}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Incorrect Answer 2"
          name="2"
          onChange={answersChanged}
          className={classes.option}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Incorrect Answer 2"
          name="3"
          onChange={answersChanged}
          className={classes.option}
        />
      </Box>
    </Box>
  );
}
