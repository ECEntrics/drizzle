import { call, put, takeLatest } from 'redux-saga/effects'

import * as AccountsActions from './constants'

/*
 * Fetch Accounts List
 */
export function * getAccounts (action) {
  const web3 = action.web3

  try {
    const accounts = yield call(web3.eth.getAccounts)

    if (!accounts)
      throw 'No accounts found!'

    yield put({ type: AccountsActions.ACCOUNTS_FETCHED, accounts })
  } catch (error) {
    yield put({ type: AccountsActions.ACCOUNTS_FAILED, error })
    console.error('Error fetching accounts:')
    console.error(error)
  }
}

function * accountsSaga () {
  yield takeLatest(AccountsActions.ACCOUNTS_FETCHING, getAccounts)
}

export default accountsSaga
