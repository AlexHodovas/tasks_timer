import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteTaskButton from "./DeleteTaskButton";
import { getTasks } from "../redux/store";

const StyledTableContainer = withStyles(theme => ({
  root: {
    minWidth: 700,
    width: "90%",
    margin: "0 auto"
  }
}))(TableContainer);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.grey
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "aliceblue"
  }
}))(TableRow);

const TasksTable = ({ tasks }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>№</StyledTableCell>
            <StyledTableCell align="right">Task</StyledTableCell>
            <StyledTableCell align="right">Time&nbsp;start</StyledTableCell>
            <StyledTableCell align="right">Time&nbsp;end</StyledTableCell>
            <StyledTableCell align="right">Time&nbsp;spend</StyledTableCell>
            <StyledTableCell align="right">Info</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, i) => {
            const { id, taskName, startTime, endTime, taskDuration } = task;

            return (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{taskName}</StyledTableCell>
                <StyledTableCell align="right">{startTime}</StyledTableCell>
                <StyledTableCell align="right">{endTime}</StyledTableCell>
                <StyledTableCell align="right">{taskDuration}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link
                    to={`/tasks/:${id}?`}
                    className="MuiButton-contained MuiButton-root MuiButtonBase-root"
                  >
                    Info
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteTaskButton id={id} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

const mapStateToProps = state => ({
  tasks: getTasks(state)
});

export default connect(mapStateToProps, null)(TasksTable);
