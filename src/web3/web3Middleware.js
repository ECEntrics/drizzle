import { networkIdChanged, WEB3_INITIALIZED } from './web3Actions'

export const web3Middleware = () => store => next => action => {
  const { type } = action

  if (type === WEB3_INITIALIZED) {
    if(!window.ethereum)
      console.warn('No Metamask detected, not subscribed to network changes!')
    else {
      window.ethereum.on('networkChanged', (networkId) => {
        // Warning: 'networkChanged' is deprecated (EIP-1193)
        const storedNetworkId = store.getState().web3.networkId;
        if(storedNetworkId && (networkId !== storedNetworkId)){
          store.dispatch(networkIdChanged(networkId));  // Just to be typical
          window.location.reload();
        }
      });
    }
  }
  return next(action)
}

const initializedMiddleware = web3Middleware()
export default initializedMiddleware
