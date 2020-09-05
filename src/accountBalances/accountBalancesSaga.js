import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  ACCOUNT_BALANCES_FAILED,
  ACCOUNT_BALANCE_FETCHED,
  ACCOUNT_BALANCES_FETCHED,
  ACCOUNT_BALANCES_FETCHING
} from './accountBalancesActions'

export function * getAccountBalances (action) {
  const accounts = yield select(getAccountsState)
  const web3 = action.web3
  if (!accounts) {
    console.error('No accounts found while attempting to fetch balances!')
  }

  let account;

  try {
    for (let i in accounts) {
      account = accounts[i];
      let accountBalance = yield call(web3.eth.getBalance, account);

      yield put({ type: ACCOUNT_BALANCE_FETCHED, account, accountBalance });
    }
    yield put({ type: ACCOUNT_BALANCES_FETCHED });
  } catch (error) {
    yield put({ type: ACCOUNT_BALANCES_FAILED, error });
    console.error('Error fetching account ' + account + ' balance:');
    console.error(error);
  }
}

export const getAccountsState = state => state.accounts

function * accountBalancesSaga () {
  yield takeLatest(ACCOUNT_BALANCES_FETCHING, getAccountBalances)
}

export default accountBalancesSaga
