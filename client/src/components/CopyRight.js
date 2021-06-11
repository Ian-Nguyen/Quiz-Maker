import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));

export default function CopyRight() {
  const classes = useStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.root}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Quiz Maker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      <br />
      All Rights Reserved!
    </Typography>
  );
}
