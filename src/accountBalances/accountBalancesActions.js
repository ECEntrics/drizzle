import { ACCOUNT_BALANCES_FETCHING } from './constants'

export function accountBalancesFetching (web3) {
  return {
    type: ACCOUNT_BALANCES_FETCHING,
    web3
  }
}
