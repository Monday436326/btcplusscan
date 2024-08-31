import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';

    // Get the latest block number
    const latestBlockResponse = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_blockNumber',
      },
    });
    
    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);
    
    // Get the latest block details
    const blockResponse = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        tag: `0x${latestBlockNumber.toString(16)}`,
        boolean: true,
      },
    });

    const blockData = blockResponse.data.result;
    const transactions = [];

    for (let i = 0; i < Math.min(blockData.transactions.length, 6); i++) {
      const transaction = blockData.transactions[i];
      const timestamp = parseInt(blockData.timestamp, 16) * 1000; // Convert to milliseconds
      const timeAgo = Math.floor((Date.now() - timestamp) / 1000); // Time in seconds

      transactions.push({
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value,
        time: timeAgo
      });
    }

    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Error fetching latest block details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}