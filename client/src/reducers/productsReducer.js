import { AUTH_ERROR } from "../actions/types";

const initialState = {
  a: true,
  b: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        a: false,
        b: true
      };

    default:
      return state;
  }
};
