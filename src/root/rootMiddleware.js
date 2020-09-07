import drizzleMiddleware from '../drizzle/drizzleMiddleware'
import accountsMiddleware from '../accounts/accountsMiddleware'
import accountBalancesMiddleware from '../accountBalances/accountBalancesMiddleware'
import web3Middleware from '../web3/web3Middleware'

export default [
  drizzleMiddleware,
  accountsMiddleware,
  accountBalancesMiddleware,
  web3Middleware
]
