import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';

    const latestBlockResponse = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_blockNumber',
      },
    });
    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);

    // Batch requests for block details
    const blockRequests = [];
    for (let i = latestBlockNumber; i > latestBlockNumber - 6; i--) {
      blockRequests.push(
        axios.get(apiUrl, {
          params: {
            module: 'proxy',
            action: 'eth_getBlockByNumber',
            tag: `0x${i.toString(16)}`,
            boolean: true,
          },
        })
      );
    }

    const blockResponses = await Promise.all(blockRequests);
    const blockDetails = blockResponses.map((response, index) => {
      const blockData = response.data.result;
      const timestamp = parseInt(blockData.timestamp, 16) * 1000;
      const timeAgo = Math.floor((Date.now() - timestamp) / 1000);

      return {
        blockHeight: latestBlockNumber - index,
        timestamp: timestamp,
        timeAgo: timeAgo,
        txnHash: blockData.transactions[0],
      };
    });

    res.json({ latestBlocks: blockDetails });
  } catch (error) {
    console.error('Error fetching latest block details:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}