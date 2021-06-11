import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CopyRight from "../components/CopyRight";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "animate.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/makeQuiz.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    color: "white",
    alignItems: "center",
  },
  blue: {
    backgroundColor: " rgb(100, 100, 255)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: "black",

    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    borderRadius: "4px",
    backgroundColor: "white",
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [idError, setIdError] = useState(false);
  const [error, setError] = useState();
  const [red, setRed] = useState(false);

  /*
  Handles form submission for quiz id search form
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    var id = event.target.id.value;
    if (!id) {
      setIdError(true);
      setError("You must enter a valid quiz id");
      return false;
    } else {
      setIdError(false);
      setError("");
      const body = {
        id: id,
      };
      //Get the questions from our API. Api gets the questions from the database and returns them

      await axios
        .post("api/getquiz", body)

        .then((response) => {
          //Go to the takequiz page and send the questions
          props.history.push("/takequiz", {
            questions: response.data.questions,
            quizID: response.data.UID,
          });
        })
        //Show error if quiz not found
        .catch(function (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          )
            setError(error.response.data.error);
        });
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={false}
        sm={6}
        md={9}
        className={`${classes.image} animated  fadeIn`}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        component={Paper}
        elevation={6}
        className={`${classes.blue}`}
        square
      >
        <div className={`${classes.paper} animated  fadeInDownBig delay-1s`}>
          <Avatar className={classes.avatar}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Find Quiz
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              className={classes.textField}
              error={idError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="Quiz ID"
              variant="filled"
              name="id"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Search
            </Button>
            <Typography variant="body1" color="secondary">
              {error}
            </Typography>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
