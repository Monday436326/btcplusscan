// pages/api/balance.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { address } = req.query;
    // const YOUR_ETHERSCAN_API_KEY = '6C57CGQPTWJEN4NFBCV2SJNSWCF1VTEZJD';

    const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';
    

    const response = await axios.get(apiUrl, {
      params: {
        module: 'account',
        action: 'balance',
        address: address,
      },
    });

    const getBalance = response.data.result;
    return res.status(200).json({ getBalance });
  } catch (error) {
    console.error(`Error fetching latest balance: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
