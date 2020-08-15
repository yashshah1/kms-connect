import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];
// const composeEnhancers = composeWithDevTools();

const enhancers =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middlewares)
    : compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );

const store = createStore(rootReducer, enhancers);

export default store;
