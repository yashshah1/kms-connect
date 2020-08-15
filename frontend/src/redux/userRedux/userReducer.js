import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER,
} from "./userActionTypes";

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

    case UPDATE_USER:
      const { person_no } = action.payload;
      const newUsers = state.users.map(user =>
        user.person_no === person_no ? action.payload : user
      );
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};

export default userReducer;
