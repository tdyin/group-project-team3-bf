import { Reducer } from 'redux'
import { LOADING, SUCCESS, ERROR, LOAD_USER } from '../constants'
import type { UserAction, UserPayload } from '../types'

interface UserState {
  request: { loading: boolean; success: boolean; message: string }
  user: UserPayload | null
}

const initialState: UserState = {
  request: {
    loading: false,
    success: false,
    message: '',
  },
  user: null,
}

const userReducer: Reducer<UserState, UserAction> = function (
  prevState = initialState,
  action
) {
  const { type, payload } = action
  Object.freeze(prevState) // prevents us from accidentally mutating state

  switch (type) {
    case LOADING: {
      return {
        ...prevState,
        request: { loading: true, success: false, message: payload as string },
      }
    }
    case SUCCESS: {
      return {
        ...prevState,
        request: { loading: false, success: true, message: payload as string },
      }
    }
    case ERROR: {
      return {
        ...prevState,
        request: { loading: false, success: false, message: payload as string },
      }
    }
    case LOAD_USER: {
      return {
        ...prevState,
        user: payload as UserPayload,
      }
    }
    default:
      return prevState
  }
}

export default userReducer
