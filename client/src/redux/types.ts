import type { Action, AnyAction } from 'redux'
import type { ThunkAction, ThunkDispatch } from 'redux-thunk'
import store from './store'

// Nav
export type NavPayload = {
  open: boolean
}
export type NavAction = Action<string> & { payload: NavPayload }

// User
export type UserPayload = {
  id: string
  name: string
  isHr: boolean
}
export type UserAction = Action<string> & { payload: UserPayload | string }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>

// Generics default type for ReturnType
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
