import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { getTasks } from "../redux/store";
import ErrorModalWindow from "./ErrorModalWindow";

const StyledTableContainer = withStyles(theme => ({
  root: {
    minWidth: 700,
    width: "90%",
    margin: "50px auto",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  }
}))(TableContainer);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "aliceblue"
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  root: {
    textAlign: "center"
  }
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const TaskInfo = ({ history, tasks }) => {
  const classes = useStyles();
  let selectedId = +history.location.pathname.split(":")[1];
  let selectedTask = tasks.find(task => task.id === selectedId);

  if (typeof selectedTask !== "object") {
    return <ErrorModalWindow textError="task doesn't exist" />;
  }

  const { taskName, startTime, endTime, taskDuration } = selectedTask;

  return (
    <>
      <div className="linkBackWrapper">
        <Link
          to="/home/task-log"
          className="MuiButton-contained MuiButton-root MuiButtonBase-root"
        >
          Back
        </Link>
      </div>
      <StyledTableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>task text</StyledTableCell>
              <StyledTableCell align="right">
                timer value when start
              </StyledTableCell>
              <StyledTableCell align="right">
                timer value when stop
              </StyledTableCell>
              <StyledTableCell align="right">timer duration</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell component="th" scope="row">
                {taskName}
              </StyledTableCell>
              <StyledTableCell align="right">{startTime}</StyledTableCell>
              <StyledTableCell align="right">{endTime}</StyledTableCell>
              <StyledTableCell align="right">{taskDuration}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

const mapStateToProps = state => ({
  tasks: getTasks(state)
});

export default connect(mapStateToProps, null)(TaskInfo);
