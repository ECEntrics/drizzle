import { WEB3_INITIALIZED } from '../web3/constants'
import { accountsFetched, accountsListening } from './accountsActions'

export const accountsMiddleware = () => store => next => action => {
  const { type } = action

  if (type === WEB3_INITIALIZED) {
    if(!window.ethereum)
      console.warn('No Metamask detected, not subscribed to account changes!')
    else {
      store.dispatch(accountsListening());
      window.ethereum.on('accountsChanged', function (accounts) {
        console.debug("Account changed")
        store.dispatch(accountsFetched(accounts));
      });
    }
  }
  return next(action)
}

const initializedMiddleware = accountsMiddleware(undefined)
export default initializedMiddleware
