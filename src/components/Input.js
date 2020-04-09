import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: "0 auto",
    display: "flex"
  },
  floatingLabelFocusStyle: {
    color: "blue",
    fontSize: 20,
    paddingLeft: 65
  },
  input: {
    paddingBottom: 10,
    color: "blue"
  }
}));

const Input = ({ handleChange, textTask }) => {
  const classes = useStyles();

  return (
    <TextField
      label="Name of your task"
      id="inputTask"
      className={classes.root}
      InputLabelProps={{
        className: classes.floatingLabelFocusStyle
      }}
      InputProps={{ className: classes.input }}
      onChange={handleChange}
      value={textTask}
    />
  );
};

export default Input;
