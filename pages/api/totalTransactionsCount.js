import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';
  try {
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
        boolean: true, // Ensure this is set correctly
      },
    });

    const blockData = blockResponse.data.result;
    const totalTransactionsCount = blockData.transactions.length;

    const formattedCount = new Intl.NumberFormat('en-US').format(totalTransactionsCount);

    return res.status(200).json({ totalTransactionsCount: formattedCount });
  } catch (error) {
    console.error(`Error fetching total transactions count: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
