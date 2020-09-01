import * as AccountsActions from './constants'

export function accountsFetching (results) {
  return {
    type: AccountsActions.ACCOUNTS_FETCHING,
  }
}

export function accountsFetched (results) {
  return {
    type: AccountsActions.ACCOUNTS_FETCHED,
    accounts: results
  }
}

export function accountsListening (results) {
  return {
    type: AccountsActions.ACCOUNTS_LISTENING,
  }
}

export function accountsFailed (error) {
  return {
    type: AccountsActions.ACCOUNTS_FAILED,
    error
  }
}
