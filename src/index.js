import Drizzle from './Drizzle.js'
import { generateStore } from './generateStore'
import { generateContractsInitialState } from './contractStateUtils'

// Actions
import * as EventActions from './contracts/constants'
import * as AccountActions from './accounts/accountsActions'

// Reducers
import accountsReducer from './accounts/accountsReducer'
import accountBalancesReducer from './accountBalances/accountBalancesReducer'
import blocksReducer from './blocks/blocksReducer'
import contractsReducer from './contracts/contractsReducer'
import drizzleStatusReducer from './drizzleStatus/drizzleStatusReducer'
import transactionsReducer from './transactions/transactionsReducer'
import transactionStackReducer from './transactions/transactionStackReducer'
import web3Reducer from './web3/web3Reducer'

// Middleware
import drizzleMiddleware from './drizzle-middleware'
import accountsMiddleware from './accounts/accountsMiddleware'
import accountBalancesMiddleware from './accountBalances/accountBalancesMiddleware'

// Sagas
import accountBalancesSaga from './accountBalances/accountBalancesSaga'
import blocksSaga from './blocks/blocksSaga'
import contractsSaga from './contracts/contractsSaga'
import drizzleStatusSaga from './drizzleStatus/drizzleStatusSaga'

const drizzleReducers = {
  accounts: accountsReducer,
  accountBalances: accountBalancesReducer,
  contracts: contractsReducer,
  currentBlock: blocksReducer,
  drizzleStatus: drizzleStatusReducer,
  transactions: transactionsReducer,
  transactionStack: transactionStackReducer,
  web3: web3Reducer
}

const drizzleMiddlewares = [
  drizzleMiddleware,
  accountsMiddleware,
  accountBalancesMiddleware
]

const drizzleSagas = [
  accountBalancesSaga,
  blocksSaga,
  contractsSaga,
  drizzleStatusSaga
]

const drizzleActions = {
  AccountActions,
  EventActions
}

export {
  Drizzle,
  generateContractsInitialState,
  generateStore,
  drizzleReducers,
  drizzleMiddlewares,
  drizzleSagas,
  drizzleActions
}
