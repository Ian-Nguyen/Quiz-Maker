import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  number: {
    color: "#fc9003"
  }
}));

export default function QuizResult(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Box>
        <img src="/tick.png" alt="checkmark" />
      </Box>
      <Typography variant="h5">Quiz Completed.</Typography>
      <Typography variant="h4">
        You got <span className={classes.number}>{props.correct}</span> out of{" "}
        <span className={classes.number}>{props.size}</span>
      </Typography>
    </Container>
  );
}
