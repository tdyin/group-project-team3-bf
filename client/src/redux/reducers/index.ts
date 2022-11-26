import userReducer from './userReducer'
import { combineReducers, Reducer } from 'redux'

// Simple root reducer
// Map each slice of state name to its reducer

export default combineReducers({ user: userReducer })

// ------------------------------------------------------------------------------------
// Custom root reducer
// Define switch cases, update the state, return the new state

// const reducers = combineReducers({ user: userReducer, product: productReducer });

// // combineReducers passes undefined as a state to check your code
// type CombinedState = ReturnType<typeof reducers>; // use the reducer return type
// type CombinedAction = Parameters<typeof reducers>[1]; // use the reducer action arg type
// const rootReducer: Reducer<CombinedState, CombinedAction> = function rootReducer(prevState, action) {
//   // do some logic based on actions
//   return reducers(prevState, action);
// };

// export default rootReducer;
