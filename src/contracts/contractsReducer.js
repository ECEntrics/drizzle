import { generateContractInitialState } from '../contractStateUtils'
import * as ContractActions from './constants'

const initialState = {}

const contractsReducer = (state = initialState, action) => {
  /*
   * Contract Status
   */

  if (action.type === ContractActions.CONTRACT_INITIALIZING) {
    return {
      ...state,
      [action.contractConfig.contractName]: generateContractInitialState(
        action.contractConfig
      )
    }
  }

  if (action.type === ContractActions.CONTRACT_INITIALIZED) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        initialized: true,
        synced: true,
        events: []
      }
    }
  }

  // Contract not found on the current network
  if (action.type === ContractActions.CONTRACT_NOT_DEPLOYED) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        deployed: false
      }
    }
  }

  if (action.type === ContractActions.DELETE_CONTRACT) {
    const { [action.contractName]: omitted, ...rest } = state
    return rest
  }

  if (action.type === ContractActions.CONTRACT_SYNCING) {
    const contractName = action.contract.contractName

    return {
      ...state,
      [contractName]: {
        ...state[contractName],
        synced: false
      }
    }
  }

  if (action.type === ContractActions.CONTRACT_SYNCED) {
    return {
      ...state,
      [action.contractName]: {
        ...state[action.contractName],
        synced: true
      }
    }
  }

  if (action.type === ContractActions.CONTRACT_SYNC_IND) {
    return {
      ...state,
      [action.contractName]: {
        ...state[action.contractName],
        synced: false
      }
    }
  }

  /*
   * Contract Functions
   */

  if (action.type === ContractActions.GOT_CONTRACT_VAR) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        [action.variable]: {
          ...state[action.name][action.variable],
          [action.argsHash]: {
            ...state[action.name][action.variable][action.argsHash],
            args: action.args,
            fnIndex: action.fnIndex,
            value: action.value,
            error: null
          }
        }
      }
    }
  }

  if (action.type === ContractActions.CLEAR_CALL_CONTRACT_FN) {
    const { argsHash, contractName, fnName } = action;
    if(argsHash !== '0x0'){
      const {[argsHash]: _, ...remainingHashes} = state[contractName][fnName];
      return {
        ...state,
        [contractName]: {
          ...state[contractName],
          [fnName]: {
            ...remainingHashes
          }
        }
      }
    }

    return {
      ...state,
      [contractName]: {
        ...state[contractName],
        [fnName]: { }
      }
    }
  }

  if (action.type === ContractActions.ERROR_CONTRACT_VAR) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        [action.variable]: {
          ...state[action.name][action.variable],
          [action.argsHash]: {
            ...state[action.name][action.variable][action.argsHash],
            args: action.args,
            fnIndex: action.fnIndex,
            value: null,
            error: action.error
          }
        }
      }
    }
  }

  /*
   * Contract Events
   */

  if (action.type === ContractActions.CONTRACT_EVENT_FIRED) {
    return {
      ...state,
      [action.name]: {
        ...state[action.name],
        events: [...state[action.name].events, action.event]
      }
    }
  }

  return state
}

export default contractsReducer
