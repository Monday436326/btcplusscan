// pages/api/address.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    // const myapiUrl = 'https://api.etherscan.io/api';
    // const myapiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

    // const apiUrl = 'https://api-opbnb.bscscan.com/api'
    // const apiKey = '6C57CGQPTWJEN4NFBCV2SJNSWCF1VTEZJD'

    const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';

    const params = {
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 20,
      sort: 'desc',
      // apikey: apiKey,
    };

    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
}
