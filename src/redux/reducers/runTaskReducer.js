import { START_TIMER } from "../actions";

const runTaskReducer = (state = false, action) => {
  switch (action.type) {
    case START_TIMER:
      return !state;

    default:
      return state;
  }
};

export default runTaskReducer;
