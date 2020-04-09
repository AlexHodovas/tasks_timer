import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import moment from "moment";

import Input from "./Input";
import RunButton from "./RunButton";
import Timer from "./Timer";
import ModalWindow from "./ModalWindow";
import TasksTable from "./TasksTable";
import Chart from "./Chart";

import randomColor from "../helpers/randomColor";

import {
  getIsTimerRunning,
  getTimerValueWhenStop,
  getIsEmptyInput,
  getTimerTimeDuration,
  getStartTime
} from "../redux/store";

import { 
  addTask, 
  startTimer, 
  handleIsInputEmpty, 
  handleStartTime,
} from "../redux/actions";

const HomePage = ({ 
  isTimerRunning,
  runTask,
  isEmptyInput,
  addTask,
  handleIsInputEmpty,
  timerDurationTime,
  startTimeFromRedux,
  handleStartTime
}) => {
  const [currentTask, setCurrentTask] = useState({
    id: null,
    taskName: "",
    startTime: null,
    endTime: null,
    taskDuration: null,
    taskColor: null
  });

  const { taskName, endTime } = currentTask;

  const handleInputChange = e => {
    e.persist();

    setCurrentTask(prevState => {
      return {
        ...prevState,
        taskName: e.target.value
      };
    });
  };

  useEffect(() => {
    if (taskName.trim() === "") {
      handleIsInputEmpty(true);
    } else {
      handleIsInputEmpty(false);
    }

    if (endTime) {
      addTask(currentTask);
      setCurrentTask({
        id: null,
        taskName: "",
        startTime: null,
        endTime: null,
        taskDuration: null,
        taskColor: null
      });
      handleStartTime(null);
    }
  }, [endTime, taskName, currentTask, handleIsInputEmpty, addTask, handleStartTime]);


  return (
    <>
    <Input 
      handleChange={handleInputChange} 
      textTask={taskName} 
    />
    <Timer 
      isTimerRunning={isTimerRunning} 
      currentTask={currentTask} 
    />
    <RunButton
      clickFunction={() => {
        runTask();

        if (!isTimerRunning) {
          handleStartTime(moment().format("HH:mm:ss"));
        }

        if (!taskName.trim()) {
          return;
        }        

        if (isTimerRunning) {
          
          setCurrentTask(prevState => ({
            ...prevState,
            id: +new Date(),
            startTime: startTimeFromRedux,
            endTime: moment().format("HH:mm:ss"),
            taskDuration: timerDurationTime,
            taskColor: randomColor()
          }));
        }
      }}
      isTimerRunning={isTimerRunning}
    />
    {isTimerRunning && isEmptyInput ? <ModalWindow /> : null}
    <div className="nav">
      <NavLink
        to="/home/task-log"
        exact
        className="nav__item"
        activeClassName="nav__item--active"
      >
        TASKS LOG
      </NavLink>
      <NavLink
        to="/home/task-chart"
        className="nav__item"
        activeClassName="nav__item--active"
      >
        TASKS CHART
      </NavLink>
    </div>
    <Switch>
      <Route path="/home/task-log" exact component={TasksTable} />
      <Route path="/home/task-chart" exact component={Chart} />
    </Switch>
    </>
  );
};

const mapStateToProps = state => ({
  isTimerRunning: getIsTimerRunning(state),
  stopTimerValue: getTimerValueWhenStop(state),
  isEmptyInput: getIsEmptyInput(state),
  timerDurationTime: getTimerTimeDuration(state),
  startTimeFromRedux: getStartTime(state),
});

const mapDispatchToProps = dispatch => ({
  runTask: () => dispatch(startTimer()),
  addTask: task => dispatch(addTask(task)),
  handleIsInputEmpty: value => dispatch(handleIsInputEmpty(value)),
  handleStartTime: value => dispatch(handleStartTime(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);