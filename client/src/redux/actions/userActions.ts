import { createAction } from '../store'
import { LOADING, SUCCESS, ERROR, LOAD_USER } from '../constants'
import type { AppDispatch, AppThunk } from '../types'

export const loadUserThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(createAction(LOADING, 'Loading users.'))
  setTimeout(() => {
    if (true) {
      dispatch(
        createAction(LOAD_USER,
          { id: 1, name: 'User1', isHr: false },
        )
      )
      dispatch(createAction(SUCCESS, 'Successfully loaded users.'))
    } else {
      dispatch(createAction(ERROR, 'There was an issue trying to load users.'))
    }
  }, 2000)
}
