import { createAction } from '../store'
import { TOGGLE_NAV } from '../constants'
import type { NavPayload } from '../types'

export const toggleNavAction = (data: NavPayload) =>
  createAction(TOGGLE_NAV, data)
