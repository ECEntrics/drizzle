import Drizzle from './Drizzle.js'
import { generateStore } from './generateStore'
import { generateContractsInitialState } from './contractStateUtils'

// Actions
import * as EventActions from './contracts/constants'
import * as AccountActions from './accounts/accountsActions'

// Reducers
import drizzleReducers from './root/rootReducer'

// Middlewares
import drizzleMiddlewares from './root/rootMiddleware'

// Sagas
import drizzleSagas from './root/rootSaga'

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
