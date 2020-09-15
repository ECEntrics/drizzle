import * as TransactionsActions from './transactionsActions'

const initialState = []

const transactionStackReducer = (state = initialState, action) => {
  if (action.type === TransactionsActions.PUSH_TO_TXSTACK) {
    return [...state, action.stackTempKey];
  }

  if (action.type === TransactionsActions.POP_FROM_TXSTACK) {
    return [...state.slice(0, -1)];
  }

  if (action.type === TransactionsActions.TX_BROADCASTED) {
    return state.map((txHash, index) => {
      if (index !== action.stackId) {
        // This isn't the item we care about - keep it as-is
        return txHash;
      }

      // Otherwise, this is the one we want - return an updated value
      return action.txHash;
    })
  }

  return state;
}

export default transactionStackReducer
