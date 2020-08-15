import { combineReducers } from "redux";
import userReducer from "./userRedux/userReducer";
import errorReducer from "./errorRedux/errorReducer";
import authReducer from "./authRedux/authReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
