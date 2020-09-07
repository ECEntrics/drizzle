export const WEB3_INITIALIZING = 'WEB3_INITIALIZING'
export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
export const WEB3_FAILED = 'WEB3_FAILED'
export const WEB3_USER_DENIED = 'WEB3_USER_DENIED'

export const WEB3_NETWORK_FETCHING = 'WEB3_NETWORK_FETCHING'
export const WEB3_NETWORK_FETCHED = 'WEB3_NETWORK_FETCHED'
export const WEB3_NETWORK_CHANGED = 'WEB3_NETWORK_CHANGED'
export const WEB3_NETWORK_FAILED = 'WEB3_NETWORK_FAILED'
export const WEB3_NETWORK_MISMATCH = 'WEB3_NETWORK_MISMATCH'

export const NETWORK_IDS = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
    ganache: 5777
}

export function networkInfoFetching (web3) {
    return {
        type: WEB3_NETWORK_FETCHING,
        web3
    }
}

export function networkChanged () {
    return {
        type: WEB3_NETWORK_CHANGED
    }
}
