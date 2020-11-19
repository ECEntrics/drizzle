const defaultOptions = {
  web3: {
    customProvider:{},
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    },
    retryPermissionDialog: true
  },
  contracts: [],
  events: {},
  syncAlways: false,
  reloadWindowOnNetworkChange: false,
  reloadWindowOnAccountChange: false,
  networkWhitelist: []
}

export default defaultOptions
