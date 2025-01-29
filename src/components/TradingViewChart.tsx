import { useEffect, useRef, useState } from 'react';
import {fetchForexData} from '../config/api'; // Import the Alpha Vantage API function

interface TradingViewChartProps {
  fromCurrency:string, toCurrency:string 
}


const TradingViewChart: React.FC<TradingViewChartProps> = ({fromCurrency, toCurrency}) => {
  const chartContainerRef = useRef(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    if (window.TradingView) {
      const widget = new window.TradingView.widget({
        container_id: chartContainerRef.current.id,
        symbol: `${fromCurrency}${toCurrency}`,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
      });

      return () => widget.remove(); // Cleanup on component unmount
    }
  }, [fromCurrency, toCurrency]);

  // Fetch the real-time data from Alpha Vantage and update the chart
  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const data = await fetchForexData(fromCurrency, toCurrency);

        // Check if the response contains the expected data
        if (data && data['5. Exchange Rate']) {
          setPrice(data['5. Exchange Rate']);
        } else {
          setError('Failed to fetch price data. Please try again later.');
          console.error('Error: Data format is invalid or API limit exceeded', data);
        }
      } catch (error) {
        setError('An error occurred while fetching price data.');
        console.error('Error fetching price data:', error);
      }
    };

    fetchAndUpdate();
    const intervalId = setInterval(fetchAndUpdate, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Cleanup polling
  }, [fromCurrency, toCurrency]);

  return (
    <div className="w-3/4 px-2">
      {/* <h2 className='text-white/60'>{fromCurrency}/{toCurrency} Real-Time Price: {price ? price : 'Loading...'}</h2> */}
      {error && <p className="text-red-500">{error}</p>}
      <div id="tradingview-chart" ref={chartContainerRef} className="w-full h-full px-[-48px]"></div>
    </div>
  );
};

export default TradingViewChart;
