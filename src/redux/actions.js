// action types
export const START_TIMER = "START_TIMER";
export const START_TIME = "START_TIME";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const IS_EMPTY_INPUT = "IS_EMPTY_INPUT";
export const HANDLE_TIMER_DURATION = "HANDLE_TIMER_DURATION";
export const DELETE_ALL_TASKS = "DELETE_ALL_TASKS";

// action creators
export const startTimer = () => ({ type: START_TIMER });
export const handleStartTime = value => ({ type: START_TIME, value });
export const addTask = task => ({ type: ADD_TASK, task });
export const deleteTask = id => ({ type: DELETE_TASK, id });
export const handleIsInputEmpty = value => ({ type: IS_EMPTY_INPUT, value });
export const saveTimerDuration = value => ({
  type: HANDLE_TIMER_DURATION,
  value
});
export const deleteAllTasks = () => ({ type: DELETE_ALL_TASKS });
