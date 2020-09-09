import Drizzle from './Drizzle.js'
import { generateStore } from './generateStore'
import { generateContractsInitialState } from './contractStateUtils'

// Actions
import * as AccountActions from './accounts/accountsActions'
import * as DrizzleActions from './drizzle/drizzleActions'
import * as EventActions from './contracts/constants'

// Reducers
import drizzleReducers from './root/rootReducer'

// Middlewares
import drizzleMiddlewares from './root/rootMiddleware'

// Sagas
import drizzleSagas from './root/rootSaga'

const drizzleActions = {
  account: AccountActions,
  drizzle: DrizzleActions,
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
