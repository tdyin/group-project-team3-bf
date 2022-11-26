import { legacy_createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export default legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export const createAction = (type: string, payload: any) => ({ type, payload })
