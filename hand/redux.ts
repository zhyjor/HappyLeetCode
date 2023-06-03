const ActionTypes = {
  REPLACE: '',
}

function createStore1(reducer, loadedState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the root reducer to be function');
  }
  let currentState = loadedState;
  let currentReducer = reducer;
  let currentListeners = [];

  let nextListeners = currentListeners;
  let isDispatching = false;

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('You may need to add middleware to you store setup to handler dispatching other values, such as "redux-thunk" to handle dispatching functions')
    }
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. you may has misspelled an action type string constant');
    }
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions');
    }
    try {
      isDispatching = true;
      // 调用reducer传入currentState和actions，reducer的返回值赋给currentState
      currentState = currentReducer(currentState, action);

    } finally {
      isDispatching = false;
    }
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }
  function subscribe(listener: () => void) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function. Instead');
    }
    if (isDispatching) {
      throw new Error();
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error();
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    }
  }
  function getState() { return currentState; }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function. Instead, received:')
    }
    currentReducer = nextReducer;

    dispatch({ type: '@redux/INIT$' });
    return {
      dispatch,
      replaceReducer,
      getState,
      subscribe,
    }
  }

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  dispatch({ type: ActionTypes.REPLACE })

  return {
    dispatch, subscribe, getState, replaceReducer,
  }

}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== 'object' && typeof actionCreators === null) {
    throw new Error();
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] === bindActionCreator(actionCreator, dispatch);
    }
  }
}

function bindActionCreator(actionCreator, dispatch) {
  return function (this: any, ...args: any[]) {
    return dispatch(actionCreator.apply(this, args));
  }
}

function isPlainObject(obj): boolean { return !obj }

function combineReducers(reducers) {
  // 先拿到reducers所有key组成的列表
  const finalReducers = Object.keys(reducers);

  return function combination(state, action) {
    // 定义hasChanged变量，表示本次派发的action是否修改了state
    let hasChanged = false;

    // 定义本次reducer执行，返回整体的store
    const nextState = {};

    // 迭代reducers中的每个reducer
    for (let key of finalReducers) {
      // 获取reducers中的reducer
      const reducer = finalReducers[key];
      // 获取当前reducers中对应的state
      const previousStateForKey = state[key];
      // 执行reducer，传入旧的state以及action获取执行后的state
      const nextStateForKey = reducer(previousStateForKey, action);
      // 更新
      nextState[key] = nextStateForKey;
      // 判断是否变化，如果reducer返回了全新的state，那么重制hasChanged状态为true
      hasChanged = hasChanged || previousStateForKey !== nextStateForKey;
    }

    // 最后更根据finalReducers的长度进行一次判断（是否有新增reduce执行为state添加了新的key&value）
    hasChanged = hasChanged || finalReducers.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  }
}

// 中间件
// 我们需要传入的一个函数是个异步函数，我们需要支持传入的actin是一个函数
// 在函数内部可以自由的进行异步派发action

import { applyMiddleware, createStore } from 'redux';
function thunkMiddleware({ getState, dispatch }) {
  // 返回的next参数会在下一次middleware中当作dispatch来触发action
  return function (next) {
    // 接受真实传入的action
    return function (action) {
      if (typeof action === 'function') {
        // 调用函数，讲next（单个中间件约等于store.dispatch）传递给action函数作为参数
        // 修改dispatch函数的返回值作为传入函数的返回值
        return action(dispatch, getState);
      }
      return action(dispatch, getState);
    }
  }
}

const ADD = 'add';
const reducer = (state = { number: 1 }, action) => {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 }
    default:
      return state;
  }
}

const actionType = () => {
  return (dispatch) => {
    setTimeout(() => dispatch({ type: ADD }), 1000);
  }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.dispatch(actionType());


export default createStore;
