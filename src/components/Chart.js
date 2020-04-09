import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { connect } from "react-redux";
import moment from "moment";
import { getTasks } from "../redux/store";
import GenerateTenTasksButton from "./GenerateTenTasksButton";
import randomColor from "../helpers/randomColor";
import { deleteAllTasks }from "../redux/actions";

const Chart = ({ tasks, deleteAllTasksFromLog }) => {
  const data = [];
  const [isClickedGenerateButton, setClickedGenerateButton] = useState(null);
  const [generatedTasks, setGeneratedTasks] = useState([]);

  const randomTaskDuration = () => {
    const randomMinutes = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const random = randomMinutes(10, 90);
    const randomMS = random * 60 * 1000;

    return moment.utc(randomMS).format("HH:mm:ss");
  };

  const breakBetweenGenerated10Tasks = () => {
    const randomMinutes = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return moment.utc(randomMinutes(1, 15) * 60 * 1000).format("HH:mm:ss");
  };

  const totalTime = (startTime, taskDuration) => {
    const durations = [startTime, taskDuration];

    const totalDurations = durations
      .slice(1)
      .reduce(
        (prev, cur) => moment.duration(cur).add(prev),
        moment.duration(durations[0])
      );

    return moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss");
  };

  const generateTenTasks = () => {
    let generatedTasks = [];

    for (let i = 0; i < 10; i++) {
      let startTime;

      if (i === 0) {
        startTime = "06:00:00";
      } else {
        startTime = totalTime(
          generatedTasks[i - 1].endTime,
          breakBetweenGenerated10Tasks()
        );
      }

      let taskDuration = randomTaskDuration();
      let endTime = totalTime(startTime, taskDuration);

      generatedTasks.push({
        startTime: startTime,
        taskDuration: taskDuration,
        endTime: endTime,
        id: i + 1,
        taskColor: randomColor()
      });
    }
    setClickedGenerateButton(false);

    return generatedTasks;
  };

  if (isClickedGenerateButton) {
    setGeneratedTasks(generateTenTasks());
  }

  const needTasks = hour => {
    if (isClickedGenerateButton !== null) {
      return [...generatedTasks].filter(
        ({ startTime }) => startTime.split(":").map(el => +el)[0] === hour
      );
    } else {
      return tasks.filter(
        ({ startTime }) => startTime.split(":").map(el => +el)[0] === hour
      );
    }
  };

  const durationsTasksInThisHour = tasks => {
    const durations = [];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const hourStart = task.startTime.split(":")[0];
      const hourEnd = task.endTime.split(":")[0];

      if (hourStart === hourEnd) {
        durations.push(task.taskDuration);
      } else {
        const startTimeMoment = moment(task.startTime, "HH:mm:ss");
        const nextHour = +task.startTime.split(":")[0] + 1;
        let nextHourString = "";

        if (nextHour > 9) {
          nextHourString = `${nextHour}:00:00`;
        } else {
          nextHourString = `0${nextHour}:00:00`;
        }

        let nextHourMoment = moment(nextHourString, "HH:mm:ss");

        durations.push(
          moment.utc(nextHourMoment.diff(startTimeMoment)).format("HH:mm:ss")
        );
      }
    }

    return durations;
  };

  let timeDurationFromPrevTask = null;

  const minutesInThisHour = hour => {
    let arrayOfMinutesInThisHour = [];
    let tasks = needTasks(hour);
    let minutesInThisHourFromPrevTask = null;

    if (timeDurationFromPrevTask !== null) {
      let duration = +timeDurationFromPrevTask.slice(0, 2);

      if (duration >= 1) {
        minutesInThisHourFromPrevTask = "00:60:00";
        let timeDurationFromPrevTaskMoment = moment(
          timeDurationFromPrevTask,
          "HH:mm:ss"
        );
        let oneHourMoment = moment("01:00:00", "HH:mm:ss");

        timeDurationFromPrevTask = moment
          .utc(timeDurationFromPrevTaskMoment.diff(oneHourMoment))
          .format("HH:mm:ss");
      } else {
        minutesInThisHourFromPrevTask = timeDurationFromPrevTask;
        timeDurationFromPrevTask = null;
      }
    }

    let durations = [
      minutesInThisHourFromPrevTask,
      ...durationsTasksInThisHour(tasks)
    ];

    for (let i = 0; i < durations.length; i++) {
      const duration = durations[i];

      if (durations[i] === null) {
        continue;
      }
      arrayOfMinutesInThisHour.push(+duration.split(":")[1]);
      minutesInThisHourFromPrevTask = null;
    }

    if (tasks.length > 0) {
      const lastTaskInThisHour = tasks[tasks.length - 1];
      const startHourInLastTaskInThisHour = +lastTaskInThisHour.startTime.split(
        ":"
      )[0];
      const endHourInLastTaskInThisHour = +lastTaskInThisHour.endTime.split(
        ":"
      )[0];

      if (endHourInLastTaskInThisHour - startHourInLastTaskInThisHour > 0) {
        const timeDurationFromPrevTaskMoment = moment(
          lastTaskInThisHour.taskDuration,
          "HH:mm:ss"
        );
        const timeDurationFromPrevHourMoment = moment(
          durations[durations.length - 1],
          "HH:mm:ss"
        );

        timeDurationFromPrevTask = moment
          .utc(
            timeDurationFromPrevTaskMoment.diff(timeDurationFromPrevHourMoment)
          )
          .format("HH:mm:ss");
      }
    }

    return arrayOfMinutesInThisHour;
  };

  let prevTaskId;

  const addTaskDurationToData = hour => {
    const objOfTasksDuration = {};
    const arr = minutesInThisHour(hour);
    const prevTasks = needTasks(hour - 1);
    const tasks = needTasks(hour);

    if (prevTasks.length > 0) {
      prevTaskId = prevTasks[prevTasks.length - 1].id;
    }

    if (arr.length > 0) {
      for (let j = 0; j < arr.length; j++) {
        let task = tasks[j];
        let taskName = null;

        if (arr.length === tasks.length) {
          taskName = `Task-${task.id} in hour-${hour}`;
          objOfTasksDuration[taskName] = arr[j];
        }

        if (arr.length !== 0 && tasks.length === 0) {
          taskName = `Task-${prevTaskId} in hour-${hour}`;
          objOfTasksDuration[taskName] = arr[j];
        }

        if (arr.length > tasks.length) {
          if (j === 0) {
            taskName = `Task-${prevTaskId} in hour-${hour}`;
            objOfTasksDuration[taskName] = arr[j];
          }

          if (j > 0) {
            taskName = `Task-${tasks[j - 1].id} in hour-${hour}`;
            objOfTasksDuration[taskName] = arr[j];
          }
        }
      }
    }

    return objOfTasksDuration;
  };

  for (let i = 0; i < 24; i++) {
    if (i <= 4) {
      data.push({
        minutes: i * 15,
        hour: i,
        ...addTaskDurationToData(i)
      });
    } else {
      data.push({
        hour: i,
        ...addTaskDurationToData(i)
      });
    }
  }

  let prevTaskColor;

  const findTaskColor = (taskName, hour) => {
    let taskId = +taskName.split(" ")[0].replace(/Task-/gi, "");
    let needTask = needTasks(hour).filter(el => el.id === taskId);
    let [obj] = needTask;

    if (obj) {
      prevTaskColor = obj.taskColor;
      return obj.taskColor;
    } else {
      return prevTaskColor;
    }
  };

  const dataSeries = (data, hour) => {
    let series = [];
    let dataKeys = Object.keys(data[hour]);

    for (const key of dataKeys) {
      if (key !== "hour" && key !== "minutes") {
        series.push(
          <Bar
            dataKey={key}
            barSize={20}
            stackId="a"
            fill={findTaskColor(key, hour)}
            key={key}
          />
        );
      }
    }

    return series;
  };

  return (
    <>
      <GenerateTenTasksButton
        clickFunction={
          () => {
            setClickedGenerateButton(true);
            deleteAllTasksFromLog();
          }
        }
      />
      <ResponsiveContainer width="90%" aspect={6.0 / 2.0} height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="hour" />
          <YAxis dataKey="minutes" />
          <Tooltip />
          <Legend />
          {data.map((_, i) => dataSeries(data, i))}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

const mapStateToProps = state => ({
  tasks: getTasks(state)
});

const mapDispatchToProps = dispatch => ({
  deleteAllTasksFromLog: () => dispatch(deleteAllTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
