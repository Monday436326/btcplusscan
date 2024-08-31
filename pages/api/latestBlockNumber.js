// pages/api/latestBlockNumber.js
import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';
  try {
    const response = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_blockNumber'
      }
    });
    
    const latestBlockNumber = parseInt(response.data.result, 16);
    const formattedBlockNumber = new Intl.NumberFormat('en-US').format(latestBlockNumber);

    return res.status(200).json({ latestBlockNumber: formattedBlockNumber });
  } catch (error) {
    console.error(`Error fetching latest block number: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}