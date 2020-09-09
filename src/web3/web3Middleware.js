import { networkChanged, networkInfoFetching, networkListening, WEB3_INITIALIZED } from './web3Actions'

export const web3Middleware = web3 => store => next => action => {
  const { type } = action

  if (type === WEB3_INITIALIZED) {
    if(!window.ethereum)
      console.warn('No Metamask detected, not subscribed to network changes!')
    else {
      web3 = action.web3;
      window.ethereum.on('chainChanged', (chainId) => {
        const storedChainId = store.getState().web3.chainId;
        const networkFailed = store.getState().web3.networkFailed;
        if((storedChainId || networkFailed) && (chainId !== storedChainId)){
          store.dispatch(networkChanged());
          store.dispatch(networkInfoFetching(web3));
        }
      });
      store.dispatch(networkListening());
    }
  }
  return next(action)
}

const initializedMiddleware = web3Middleware(undefined)
export default initializedMiddleware
