import * as DrizzleActions from './drizzleActions'

const initialState = {
  initializing: true,
  initialized: false,
  failed: false
}

const drizzleStatusReducer = (state = initialState, action) => {
  /*
   * Drizzle Status
   */

  if (action.type === DrizzleActions.DRIZZLE_INITIALIZING) {
    return {
      ...state,
      ...initialState
    }
  }

  if (action.type === DrizzleActions.DRIZZLE_INITIALIZED) {
    return {
      ...state,
      initializing: false,
      initialized: true,
      failed: false
    }
  }

  if (action.type === DrizzleActions.DRIZZLE_FAILED) {
    return {
      ...state,
      initializing: false,
      initialized: false,
      failed: true
    }
  }

  return state
}

export default drizzleStatusReducer
