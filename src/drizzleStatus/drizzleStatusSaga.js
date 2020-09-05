import { call, put, takeLatest } from 'redux-saga/effects'

// Initialization Functions
import { getNetworkId, initializeWeb3 } from '../web3/web3Saga'
import { getAccounts } from '../accounts/accountsSaga'
import { getAccountBalances } from '../accountBalances/accountBalancesSaga'
import * as DrizzleActions from './drizzleActions'
import * as BlocksActions from '../blocks/blockActions'

import { NETWORK_IDS, NETWORK_MISMATCH } from '../web3/web3Actions'
import { CONTRACT_NOT_DEPLOYED } from '../contracts/constants'
import { isContractDeployed } from '../contracts/contractsSaga'

export function * initializeDrizzle (action) {
  try {
    const { drizzle, options } = action

    // Initialize web3 and get the current network ID.
    const web3 = yield call(initializeWeb3, options.web3)
    drizzle.web3 = web3

    // Client may opt out of connecting their account to the dapp Guard against
    // further web3 interaction, and note web3 will be undefined
    //
    if (web3) {
      const networkId = yield call(getNetworkId, { web3 })

      // Check whether network is allowed
      const networkWhitelist = options.networkWhitelist
      if (networkWhitelist.length &&
          networkId !== NETWORK_IDS.ganache &&
          !networkWhitelist.includes(networkId)) {
        yield put({ type: NETWORK_MISMATCH, networkId })
      } else {
        // Get initial accounts list and balances.
        yield call(getAccounts, { web3 })
        yield call(getAccountBalances, { web3 })

        // Instantiate contracts passed through via options.
        for (let i = 0; i < options.contracts.length; i++) {
          const contractConfig = options.contracts[i]
          let events = []
          const contractName = contractConfig.contractName;
          if (contractName in options.events) {
            events = options.events[contractName]
          }

          if(!(yield call(isContractDeployed, { web3, contractConfig }))){
            yield put({ type: CONTRACT_NOT_DEPLOYED, name: contractName })
            throw `Contract ${contractName} not deployed on this network`
          }

          yield call([drizzle, drizzle.addContract], contractConfig, events)
        }

        yield put({ type: BlocksActions.BLOCKS_LISTENING, drizzle, web3 })
      }
    }
  } catch (error) {
    yield put({ type: DrizzleActions.DRIZZLE_FAILED, error })
    console.error('Error initializing Drizzle:')
    console.error(error)

    return
  }

  yield put({ type: DrizzleActions.DRIZZLE_INITIALIZED })
}

function * drizzleStatusSaga () {
  yield takeLatest(DrizzleActions.DRIZZLE_INITIALIZING, initializeDrizzle)
}

export default drizzleStatusSaga
