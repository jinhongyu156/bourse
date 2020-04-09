import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";											// 处理异步 action
import reducers from "./../reducers/index.js";								// reducer 函数

// createStore(reducer, [initialState], enhancer): 创建 Redux store 来以存放应用中所有的 state, 整个应用中应有且仅有一个 store
/**
 * @params [Function] reducer 函数: 接收两个参数, 分别是当前的 state 树和要处理的 action，返回新的 state 树。
 * @params [any]	  initialState: 初始 state.
 * @params [Function] enhancer: 形如 middleware 的函数允许改变 store 接口, 该函数返回一个新的强化过的 store creator. 
 * @return [Object]	  state: 保存了应用所有 state 的对象, 改变 state 的惟一方法是 dispatch action.
 **/

export default createStore( reducers, {}, applyMiddleware( thunk ) );
