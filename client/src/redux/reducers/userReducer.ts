import { Reducer } from 'redux'
import { LOADING, SUCCESS, ERROR, LOAD_USERS } from '../constants'

// interface UserState {
//   request: { loading: boolean; success: boolean; message: string }
//   userList: UserPayload[]
// }

// const defaultState: UserState = {
//   request: {
//     loading: false,
//     success: false,
//     message: '',
//   },
//   userList: [],
// }

// const userReducer: Reducer<UserState, UserAction> = function (
//   prevState = defaultState,
//   action
// ) {
//   const { type, payload } = action
//   Object.freeze(prevState) // prevents us from accidentally mutating state

//   switch (type) {
//     case LOADING: {
//       return {
//         ...prevState,
//         request: { loading: true, success: false, message: payload as string },
//       }
//     }
//     case SUCCESS: {
//       return {
//         ...prevState,
//         request: { loading: false, success: true, message: payload as string },
//       }
//     }
//     case ERROR: {
//       return {
//         ...prevState,
//         request: { loading: false, success: false, message: payload as string },
//       }
//     }
//     case LOAD_USERS: {
//       return {
//         ...prevState,
//         userList: [...prevState.userList, payload as UserPayload],
//       }
//     }
//     default:
//       return prevState
//   }
// }

// export default userReducer
