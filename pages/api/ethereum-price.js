// pages/api/bitcoin-price.js
import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      },
    });

    const bitcoinPrice = response.data.bitcoin.usd;
    res.json({ price: bitcoinPrice });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
