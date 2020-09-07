import { call, put } from 'redux-saga/effects'
import { ACCOUNTS_FAILED, ACCOUNTS_FETCHED, ACCOUNTS_FETCHING } from './accountsActions'

/*
 * Manually Fetch Accounts List
 */
export function * getAccounts (action) {
  const web3 = action.web3

  try {
    yield put({ type: ACCOUNTS_FETCHING });
    const accounts = yield call(web3.eth.getAccounts);

    if (!accounts.length)
      throw new Error('No accounts found!');

    yield put({ type: ACCOUNTS_FETCHED, accounts })
  } catch (error) {
    yield put({ type: ACCOUNTS_FAILED, error })
    console.error('Error fetching accounts:')
    console.error(error)
  }
}
