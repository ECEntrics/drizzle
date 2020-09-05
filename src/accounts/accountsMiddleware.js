import { WEB3_INITIALIZED } from '../web3/constants'
import { accountsFetched, accountsListening } from './accountsActions'

export const accountsMiddleware = () => store => next => action => {
  const { type } = action

  if (type === WEB3_INITIALIZED) {
    if(!window.ethereum)
      console.warn('No Metamask detected, not subscribed to account changes!')
    else {
      const { web3 } = action;
      window.ethereum.on('accountsChanged', accounts => {
        // For some reason accounts here are returned with lowercase letters, so we need to patch them
        let patchedAccounts = Array.from(accounts);
        patchedAccounts.forEach((account, i) => patchedAccounts[i] = web3.utils.toChecksumAddress(account));
        store.dispatch(accountsFetched(patchedAccounts));
      });
      store.dispatch(accountsListening());
    }
  }
  return next(action)
}

const initializedMiddleware = accountsMiddleware(undefined)
export default initializedMiddleware
