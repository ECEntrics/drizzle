import { WEB3_INITIALIZED } from '../web3/constants'
import { accountBalancesFetching } from './accountBalancesActions'
import { ACCOUNTS_FETCHED } from '../accounts/accountsActions'

export const accountBalancesMiddleware = web3 => store => next => action => {
  const { type } = action;

  if (type === WEB3_INITIALIZED)
    web3 = action.web3;

  if((type === ACCOUNTS_FETCHED) && web3){
    next(action);
    store.dispatch(accountBalancesFetching(web3));
    return;
  }

  return next(action);
}

const initializedMiddleware = accountBalancesMiddleware(undefined)
export default initializedMiddleware
