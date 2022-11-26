import { Reducer } from 'redux'
import { TOGGLE_NAV } from '../constants'
import type { NavAction } from '../types'

interface NavState {
  open: boolean
}

const initialState: NavState = {
  open: false,
}

const navReducer: Reducer<NavState, NavAction> = function (
  prevState = initialState,
  action
) {
  const { type, payload } = action
  Object.freeze(prevState)

  switch (type) {
    case TOGGLE_NAV:
      return { ...prevState, open: payload.open }
    default:
      return prevState
  }
}

export default navReducer
