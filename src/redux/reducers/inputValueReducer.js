import { IS_EMPTY_INPUT } from "../actions";

const inputValueReducer = (state = true, action) => {
  switch (action.type) {
    case IS_EMPTY_INPUT:
      return action.value;

    default:
      return state;
  }
};

export default inputValueReducer;