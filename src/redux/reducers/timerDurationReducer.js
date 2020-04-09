import { HANDLE_TIMER_DURATION } from "../actions";

const timerDurationReducer = (state = "", action) => {
  switch (action.type) {
    case HANDLE_TIMER_DURATION:
      return action.value;

    default:
      return state;
  }
};

export default timerDurationReducer;
