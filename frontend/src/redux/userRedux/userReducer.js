import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  UPDATE_USER,
  UPDATE_USERS,
} from "./userActionTypes";

const initialUserState = {
  users: {},
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
      return {
        ...state,
        users: {
          ...state.users,
          [person_no]: action.payload,
        },
      };
    case UPDATE_USERS:
      const updates = {};
      for (const user of action.payload) updates[user.person_no] = user;
      return {
        ...state,
        users: {
          ...state.users,
          ...updates,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
