import Drizzle from './Drizzle.js'
import { generateStore } from './generateStore'
import { generateContractsInitialState } from './contractStateUtils'

// Actions
import * as EventActions from './contracts/constants'
import * as AccountActions from './accounts/accountsActions'

// Reducers
import drizzleReducers from './reducer'

// Middleware
import drizzleMiddleware from './drizzle-middleware'
import accountsMiddleware from './accounts/accountsMiddleware'
import accountBalancesMiddleware from './accountBalances/accountBalancesMiddleware'
import web3Middleware from './web3/web3Middleware'

// Sagas
import drizzleSagas from './rootSaga'

const drizzleMiddlewares = [
  drizzleMiddleware,
  accountsMiddleware,
  accountBalancesMiddleware,
  web3Middleware
]

const drizzleActions = {
  account: AccountActions,
  event: EventActions
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
