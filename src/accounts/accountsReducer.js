import { ACCOUNTS_CHANGED, ACCOUNTS_FETCHED, ACCOUNTS_FETCHING } from './accountsActions'

const initialState = {}

const accountsReducer = (state = initialState, action) => {
  if (action.type === ACCOUNTS_FETCHING) {
    return state
  }

  if (action.type === ACCOUNTS_FETCHED || action.type === ACCOUNTS_CHANGED) {
    return Object.assign({}, state, action.accounts)
  }

  return state
}

export default accountsReducer
