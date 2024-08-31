// pages/api/ethGasPrice.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiUrl = 'https://btcplusexplorer.pwrlabs.io/api';
    const response = await axios.get(apiUrl, {
      params: {
        module: 'gastracker',
        action: 'gasoracle'
      }
    });
    const gasPrice = response.data.result.ProposeGasPrice;

    res.json({ gasPrice: parseInt(gasPrice) });
  } catch (error) {
    console.error('Error fetching gas price:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}