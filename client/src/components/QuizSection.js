import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import RadioGroup from "@material-ui/core/RadioGroup";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));

export default function QuizSelection(props) {
  const classes = useStyles();
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{props.question}</FormLabel>
      <RadioGroup aria-label="question">
        {props.options.map((text, index) => (
          <FormControlLabel
            value={text}
            control={<Radio />}
            label={text}
            key={index}
            onChange={() => {
              props.selected(text);
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
