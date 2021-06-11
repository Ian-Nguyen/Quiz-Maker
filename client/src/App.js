import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "animate.css";
import { Container } from "@material-ui/core";
import CopyRight from "./components/CopyRight";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },
  left: {
    backgroundColor: "#7a4491",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  right: {
    backgroundColor: "black",
  },
  teacher: {
    height: "50vh",
    backgroundImage: 'url("create.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0",

    cursor: "pointer",
    filter: "grayscale(100%)",
    "&:hover": {
      backgroundSize: "120%",
      filter: "grayscale(0%)",
      transition: "transform 2s ease-in",
    },
  },

  student: {
    backgroundImage: 'url("makeQuiz.jpg")',
  },
  button: {
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.37)",
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  textBox: {
    margin: theme.spacing(2),
    lineHeight: theme.spacing(0.2),
  },
  selectSection: {
    height: "100%",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={3} sm={12} xs={12} className={`${classes.left}`}>
        <div className={`${classes.paper} animated  fadeInDownBig delay-1s`}>
          <img src="icon.png" alt="Logo" />

          <Container maxWidth="sm" className={classes.textBox}>
            <Typography variant="h5">What is Quiz Maker:</Typography>
            <Typography variant="body1">
              Quiz Maker allows you to create simple quizes and share them with
              anyone. No sign in or registration required. Simply select an
              option to get started.
            </Typography>
          </Container>
          <CopyRight />
        </div>
      </Grid>
      <Grid
        item
        md={9}
        sm={12}
        xs={12}
        className={` animated  fadeIn  ${classes.right}`}
      >
        <Link href="/student">
          <Container
            maxWidth="xlg"
            className={`${classes.teacher} ${classes.student}`}
          >
            <Typography variant="h5" className={classes.button}>
              Take a Quiz
            </Typography>
          </Container>
        </Link>
        <Link href="/makequiz">
          <Container maxWidth="xlg" className={classes.teacher}>
            <Typography variant="h5" className={classes.button}>
              Make a Quiz
            </Typography>
          </Container>
        </Link>
      </Grid>
    </Grid>
  );
}
