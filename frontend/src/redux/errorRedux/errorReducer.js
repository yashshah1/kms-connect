import { SET_ERROR, HIDE_ERROR } from "./errorActionTypes";

const initialUserState = {
  error: null,
  isError: false,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        error: action.payload,
      };

    case HIDE_ERROR:
      return {
        ...state,
        isError: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
