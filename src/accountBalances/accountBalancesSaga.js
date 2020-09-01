import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as AccountBalancesActions from './constants'
import { ACCOUNT_BALANCES_FETCHING } from './constants'

export function * getAccountBalances (action) {
  const accounts = yield select(getAccountsState)
  const web3 = action.web3
  if (!accounts) {
    console.error('No accounts found while attempting to fetch balances!')
  }

  let account;

  try {
    for (let i in accounts) {
      account = accounts[i]
      let accountBalance = yield call(web3.eth.getBalance, account)

      yield put({ type: AccountBalancesActions.ACCOUNT_BALANCE_FETCHED, account, accountBalance })
    }
  } catch (error) {
    yield put({ type: AccountBalancesActions.ACCOUNT_BALANCE_FAILED, error })
    console.error('Error fetching account ' + account + ' balance:')
    console.error(error)
  }

  yield put({ type: AccountBalancesActions.ACCOUNT_BALANCES_FETCHED })
}

export const getAccountsState = state => state.accounts

function * accountBalancesSaga () {
  yield takeLatest(ACCOUNT_BALANCES_FETCHING, getAccountBalances)
}

export default accountBalancesSaga
