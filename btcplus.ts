// import { type Chain } from 'viem';

export const btcplus = {
  id: 21000001,
  name: 'BTC+',
  network: 'BTC+',
  nativeCurrency: { name: 'BTC+', symbol: 'BTC+', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://bitcoinplus.pwrlabs.io/'] },
    public: { http: ['https://bitcoinplus.pwrlabs.io/'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://btcplusexplorer.pwrlabs.io/' },
  },

} 
