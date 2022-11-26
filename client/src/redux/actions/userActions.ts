import { createAction } from '../store'
import { LOADING, SUCCESS, ERROR, LOAD_USERS } from '../constants'
import type { AppDispatch, AppThunk } from '../types'

// React-redux: use this in props dispatch method
// Thunk action creator (returns a thunk)
export const loadUsersThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(createAction(LOADING, 'Loading users.'))
  setTimeout(() => {
    if (true) {
      dispatch(
        createAction(LOAD_USERS, [
          { id: 1, name: 'User1' },
          { id: 2, name: 'User2' },
        ])
      )
      dispatch(createAction(SUCCESS, 'Successfully loaded users.'))
    } else {
      dispatch(createAction(ERROR, 'There was an issue trying to load users.'))
    }
  }, 3000)
}
