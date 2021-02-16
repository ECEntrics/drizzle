import { END, eventChannel } from 'redux-saga'
import { all, call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import * as BlocksActions from './blockActions'
import * as ContractActions from '../contracts/constants'

/*
 * Listen for Blocks
 */
export function createBlockChannel ({ drizzle, web3 }) {
  return eventChannel(emit => {
    const blockEvents = web3.eth
      .subscribe('newBlockHeaders', (error, result) => {
        if (error) {
          emit({ type: BlocksActions.BLOCKS_FAILED, error })

          console.error('Error in block header subscription:')
          console.error(error)

          emit(END)
        }
      })
      .on('data', blockHeader => {
        emit({ type: BlocksActions.BLOCK_RECEIVED, blockHeader, drizzle, web3 })
      })
      .on('error', error => {
        emit({ type: BlocksActions.BLOCKS_FAILED, error })
        emit(END)
      })

    const unsubscribe = () => {
      blockEvents.off()
    }

    return unsubscribe
  })
}

function * callCreateBlockChannel ({ drizzle, web3 }) {
  // Get current block
  const currentBlock = yield call(web3.eth.getBlock,"latest");
  yield put ({ type: BlocksActions.BLOCK_RECEIVED, blockHeader: currentBlock, drizzle, web3 })

  const blockChannel = yield call(createBlockChannel, {
    drizzle,
    web3
  })

  try {
    while (true) {
      var event = yield take(blockChannel)
      yield put(event)
    }
  } finally {
    blockChannel.close()
  }
}

/*
 * Process Blocks
 */
function * processBlockHeader ({ blockHeader, drizzle, web3, syncAlways }) {
  const blockNumber = blockHeader.number

  try {
    const block = yield call(web3.eth.getBlock, blockNumber, true)

    yield call(processBlock, { block, drizzle, web3, syncAlways })
  } catch (error) {
    console.error('Error in block processing:')
    console.error(error)

    yield put({ type: BlocksActions.BLOCK_FAILED, error })
  }
}

function * processBlock ({ block, drizzle, syncAlways }) {
  try {
    // Emit block for addition to store.
    // Regardless of syncing success/failure, this is still the latest block.
    yield put({ type: BlocksActions.BLOCK_PROCESSING, block })

    if (syncAlways) {
      yield all(
        Object.keys(drizzle.contracts).map(key => {
          return put({
            type: ContractActions.CONTRACT_SYNCING,
            contract: drizzle.contracts[key]
          })
        })
      )

      return
    }

    const txs = block.transactions

    if (txs.length > 0) {
      // Loop through txs looking for any contract address of interest
      for (var i = 0; i < txs.length; i++) {
        var from = txs[i].from || ''
        var fromContract = drizzle.findContractByAddress(from.toLowerCase())
        if (fromContract) {
          yield put({ type: ContractActions.CONTRACT_SYNCING, contract: fromContract })
        }

        var to = txs[i].to || ''
        var toContract = drizzle.findContractByAddress(to.toLowerCase())
        if (toContract) {
          yield put({ type: ContractActions.CONTRACT_SYNCING, contract: toContract })
        }
      }
    }
  } catch (error) {
    console.error('Error in block processing:')
    console.error(error)

    yield put({ type: BlocksActions.BLOCK_FAILED, error })
  }
}

function * blocksSaga () {
  // Block Subscriptions
  yield takeLatest(BlocksActions.BLOCKS_LISTENING, callCreateBlockChannel)
  yield takeEvery(BlocksActions.BLOCK_RECEIVED, processBlockHeader)
}

export default blocksSaga
