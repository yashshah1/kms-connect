import { GET_USER_SUCCESS, GET_USER_REQUEST } from "./userActionTypes";

const initialUserState = {
  users: [],
  loading: false,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default userReducer;
