import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";											// 处理异步 action
import reducers from "./../reducers/index.js";								// reducer 函数

export default createStore( reducers, {}, applyMiddleware( thunk ) );
