import axios from 'axios';

const API_KEY = '58ASQZO5MFVHYIRC'; // Replace with your Alpha Vantage API key

 
export const fetchAvailablePairs = async () => {
  const pairs = [
    { from_currency: 'EUR', to_currency: 'USD' },
    { from_currency: 'GBP', to_currency: 'USD' },
    { from_currency: 'USD', to_currency: 'JPY' },
    { from_currency: 'AUD', to_currency: 'USD' },
    { from_currency: 'USD', to_currency: 'CAD' },
    { from_currency: 'NZD', to_currency: 'USD' },
    { from_currency: 'EUR', to_currency: 'GBP' },
    { from_currency: 'EUR', to_currency: 'JPY' },
    { from_currency: 'GBP', to_currency: 'JPY' },
    { from_currency: 'AUD', to_currency: 'JPY' },
    { from_currency: 'USD', to_currency: 'CHF' },
    { from_currency: 'EUR', to_currency: 'CHF' },
    { from_currency: 'GBP', to_currency: 'CHF' },
    { from_currency: 'NZD', to_currency: 'JPY' },
    { from_currency: 'AUD', to_currency: 'NZD' },
    { from_currency: 'CAD', to_currency: 'JPY' },
    { from_currency: 'EUR', to_currency: 'CAD' },
    { from_currency: 'EUR', to_currency: 'AUD' },
    { from_currency: 'GBP', to_currency: 'CAD' },
    { from_currency: 'USD', to_currency: 'MXN' }
  ];
  

  return pairs;
};

// Fetch real-time forex data
export const fetchForexData = async (fromCurrency, toCurrency) => {
  const { data } = await axios.get(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`
  );
  return data['Realtime Currency Exchange Rate'];
};

