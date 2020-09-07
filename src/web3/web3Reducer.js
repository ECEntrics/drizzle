import * as Action from './web3Actions'

const initialState = {
  status: ''
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === Action.WEB3_INITIALIZING) {
    return {
      ...state,
      status: 'initializing'
    }
  }

  if (action.type === Action.WEB3_INITIALIZED) {
    return {
      ...state,
      status: 'initialized'
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
      nodeInfo: action.networkInfo.nodeInfo
    }
  }

  if (action.type === Action.WEB3_NETWORK_FAILED) {
    return {
      ...state,
      networkId: action.networkId
    }
  }
  if (action.type === Action.WEB3_NETWORK_MISMATCH) {
    return {
      ...state,
      networkMismatch: true
    }
  }

  return state
}

export default web3Reducer
