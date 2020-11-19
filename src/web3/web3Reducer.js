import * as Action from './web3Actions'
import { ACCOUNTS_FAILED } from '../accounts/accountsActions'

const initialState = {
  status: 'initializing',
  isMetaMask: false
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === Action.WEB3_INITIALIZING) {
    return {
      ...state,
      status: 'initializing'
    }
  }

  if (action.type === Action.WEB3_INITIALIZED) {
    const { web3 } = action;
    return {
      ...state,
      status: 'initialized',
      isMetaMask: !!(web3 && web3.currentProvider && web3.currentProvider.isMetaMask)
    }
  }

  if (action.type === Action.WEB3_FAILED) {
    return {
      ...state,
      status: 'failed'
    }
  }

  if (action.type === Action.WEB3_USER_DENIED) {
    return {
      ...state,
      status: 'UserDeniedAccess'
    }
  }

  if (action.type === Action.WEB3_NETWORK_FETCHED) {
    return {
      ...state,
      networkId: action.networkInfo.networkId,
      chainId: action.networkInfo.chainId,
      nodeInfo: action.networkInfo.nodeInfo,
      networkFailed: false,
      networkMismatch: false
    }
  }

  if (action.type === Action.WEB3_NETWORK_FAILED) {
    return {
      ...state,
      networkFailed: true
    }
  }
  if (action.type === Action.WEB3_NETWORK_MISMATCH) {
    return {
      ...state,
      networkMismatch: true
    }
  }

  if (action.type === ACCOUNTS_FAILED) {
    return {
      ...state,
      accountsFailed: true
    }
  }

  return state
}

export default web3Reducer
