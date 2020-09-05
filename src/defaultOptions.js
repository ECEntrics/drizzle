const defaultOptions = {
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [],
  events: {},
  syncAlways: false,
  networkWhitelist: []
}

export default defaultOptions
