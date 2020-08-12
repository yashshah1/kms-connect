import { combineReducers } from "redux";
import userReducer from "./userRedux/userReducer";
import errorReducer from "./errorRedux/errorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

export default rootReducer;
