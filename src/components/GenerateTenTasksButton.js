import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "20px auto 0",
  }
}));

const GenerateTenTasksButton = (
  { clickFunction }
) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="contained"
      onClick={clickFunction}
    >
      {"Generate 10 tasks"}
    </Button>
  );
};

export default GenerateTenTasksButton;

