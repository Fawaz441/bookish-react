import { applyMiddleware, createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./redux/reducers/reducer";

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(reducer, composedEnhancers);
export default store;
