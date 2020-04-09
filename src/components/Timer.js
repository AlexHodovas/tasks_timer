import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";

import {
  getIsTimerRunning,
  getTimerTimeDuration,
  getStartTime
} from "../redux/store";
import { saveTimerDuration } from "../redux/actions";

const Timer = ({
  isTimerRunning,
  saveTimerTime,
  timerDuration,
  startTimeFromRedux
}) => {
  const [timerTime, setTimerTime] = useState(timerDuration);

  const tick = startTimeFromRedux => {
    let endTime = moment().format("HH:mm:ss");

    let diff = moment
      .utc(
        moment(endTime, "HH:mm:ss").diff(moment(startTimeFromRedux, "HH:mm:ss"))
      )
      .format("HH:mm:ss");

    setTimerTime(diff);
  };

  useEffect(() => {
    if (isTimerRunning) {
      saveTimerTime(timerTime);
      var timerID = setInterval(() => tick(startTimeFromRedux), 1000);
    } else {
      setTimerTime("00:00:00");
    }

    if (timerTime === "23:59:59") {
      clearInterval(timerID);
    }

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timerTime, isTimerRunning, saveTimerTime, startTimeFromRedux]);

  return <div className="timerWrapper">{timerTime}</div>;
};

const mapStateToProps = state => ({
  isTimerRunning: getIsTimerRunning(state),
  timerDuration: getTimerTimeDuration(state),
  startTimeFromRedux: getStartTime(state)
});

const mapDispatchToProps = dispatch => ({
  saveTimerTime: value => dispatch(saveTimerDuration(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
