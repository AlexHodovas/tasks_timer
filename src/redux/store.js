import { createStore, combineReducers } from "redux";
import { loadState, saveState } from "../localStorage";

import tasksReducer from "./reducers/tasksReducer";
import inputValueReducer from "./reducers/inputValueReducer";
import runTaskReducer from "./reducers/runTaskReducer";
import timerDurationReducer from "./reducers/timerDurationReducer";
import startTimeReducer from "./reducers/startTimeReducer";

// selectors
export const getIsTimerRunning = state => state.isTimerRunning;
export const getTasks = state => state.tasks;
export const getIsEmptyInput = state => state.isEmptyInput;
export const getTimerValueWhenStop = state => state.timerValueWhenStop;
export const getTimerTimeDuration = state => state.timerDuration;
export const getStartTime = state => state.startTime;


const rootReducer = combineReducers({
  startTime: startTimeReducer,
  isTimerRunning: runTaskReducer,
  isEmptyInput: inputValueReducer,
  tasks: tasksReducer,
  timerDuration: timerDurationReducer
});

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
);


store.subscribe(() => {
  saveState({
    startTime: store.getState().startTime,
    isTimerRunning: store.getState().isTimerRunning,
    isEmptyInput: store.getState().isEmptyInput,
    tasks: store.getState().tasks
  });
});

export default store;
