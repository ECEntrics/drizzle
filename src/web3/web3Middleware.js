import { networkIdChanged, WEB3_INITIALIZED } from './web3Actions'

export const web3Middleware = web3 => store => next => action => {
  const { type } = action

  if (type === WEB3_INITIALIZED) {
    if(!window.ethereum)
      console.warn('No Metamask detected, not subscribed to network changes!')
    else {
      web3 = action.web3;
      window.ethereum.on('networkChanged', () => {
        // We could have listened to 'networkChanged' but it is deprecated (EIP-1193)
        store.dispatch(networkIdChanged(web3));
      });
    }
  }
  return next(action)
}

const initializedMiddleware = web3Middleware(undefined)
export default initializedMiddleware
