import { ACCOUNTS_FETCHED, ACCOUNTS_FETCHING } from './accountsActions'

const initialState = {}

const accountsReducer = (state = initialState, action) => {
  if (action.type === ACCOUNTS_FETCHING) {
    return state
  }

  if (action.type === ACCOUNTS_FETCHED) {
    return Object.assign({}, state, action.accounts)
  }

  return state
}

export default accountsReducer
