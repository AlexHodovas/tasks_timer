import { START_TIME } from "../actions";

const startTimeReducer = (state = '00:00:00', action) => {
  switch (action.type) {
    case START_TIME:
      return action.value;

    default:
      return state;
  }
};

export default startTimeReducer;
