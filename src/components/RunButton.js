import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "0 auto"
  }
}));

const RunButton = ({ clickFunction, isTimerRunning }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="contained"
      onClick={clickFunction}
    >
      {isTimerRunning ? "stop" : "start"}
    </Button>
  );
};

export default RunButton;
