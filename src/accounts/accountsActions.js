export const ACCOUNTS_FETCHING = 'ACCOUNTS_FETCHING'
export const ACCOUNTS_FETCHED = 'ACCOUNTS_FETCHED'
export const ACCOUNTS_CHANGED = 'ACCOUNTS_CHANGED'
export const ACCOUNTS_FAILED = 'ACCOUNTS_FAILED'
export const ACCOUNTS_LISTENING = 'ACCOUNTS_LISTENING'

export function accountsChanged (accounts) {
  return {
    type: ACCOUNTS_CHANGED,
    accounts
  }
}

export function accountsListening () {
  return {
    type: ACCOUNTS_LISTENING,
  }
}
