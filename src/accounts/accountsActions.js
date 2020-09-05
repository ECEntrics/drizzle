export const ACCOUNTS_FETCHING = 'ACCOUNTS_FETCHING'
export const ACCOUNTS_FETCHED = 'ACCOUNTS_FETCHED'
export const ACCOUNTS_FAILED = 'ACCOUNTS_FAILED'
export const ACCOUNTS_LISTENING = 'ACCOUNTS_LISTENING'

export function accountsFetched (accounts) {
  return {
    type: ACCOUNTS_FETCHED,
    accounts
  }
}

export function accountsListening () {
  return {
    type: ACCOUNTS_LISTENING,
  }
}
