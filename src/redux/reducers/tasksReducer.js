import { ADD_TASK, DELETE_TASK, DELETE_ALL_TASKS } from "../actions";

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id: action.task.id,
          taskName: action.task.taskName,
          startTime: action.task.startTime,
          endTime: action.task.endTime,
          taskDuration: action.task.taskDuration,
          taskColor: action.task.taskColor
        }
      ];

    case DELETE_TASK:
      return state.filter(task => task.id !== action.id);

    case DELETE_ALL_TASKS:
      return [];

    default:
      return state;
  }
};

export default tasksReducer;
