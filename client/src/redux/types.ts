import type { Action, AnyAction } from 'redux'
import type { ThunkAction, ThunkDispatch } from 'redux-thunk'
import store from './store'

export type ProductPayload = {
  id: string
  name: string
  quantity: number
  price: number
}
export type ProductAction = Action<string> & { payload: ProductPayload }

export type UserPayload = { id: string; name: string }
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

// Types https://github.com/reduxjs/redux-toolkit/issues/587
