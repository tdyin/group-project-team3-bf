import navReducer from './navReducers'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

export default combineReducers({ user: userReducer, nav: navReducer })
