import accountBalancesSaga from './accountBalances/accountBalancesSaga'
import blocksSaga from './blocks/blocksSaga'
import contractsSaga from './contracts/contractsSaga'
import drizzleStatusSaga from './drizzleStatus/drizzleStatusSaga'

export default [
  accountBalancesSaga,
  blocksSaga,
  contractsSaga,
  drizzleStatusSaga
]
