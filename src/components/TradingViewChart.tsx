import { useEffect, useRef } from 'react';


declare global {
  interface Window {
    TradingView? : {
          widget: new (options: any) => {remove : () => void}
    }
  }
}

interface TradingViewChartProps {
  fromCurrency:string, toCurrency:string 
}


const TradingViewChart: React.FC<TradingViewChartProps> = ({fromCurrency, toCurrency}) => { 
  const chartContainerRef = useRef<HTMLDivElement>(null);
  // const [price, setPrice] = useState<string | object | null>(null);
  // const [error, setError] = useState<string | null>(null);  


  // useEffect(() => {
  //   const fetchAndUpdate = async () => {
  //     try {
  //       const data = await fetchForexData(fromCurrency, toCurrency);

  //       // Check if the response contains the expected data
  //       if (data && data['5. Exchange Rate']) {
  //         setPrice(data['5. Exchange Rate']);
  //       } else {
  //         setError('Failed to fetch price data. Please try again later.');
  //         console.error('Error: Data format is invalid or API limit exceeded', data);
  //       }
  //     } catch (error) {
  //       setError('An error occurred while fetching price data.');
  //       console.error('Error fetching price data:', error);
  //     }
  //   };

  //   fetchAndUpdate();
  //   const intervalId = setInterval(fetchAndUpdate, 1000);  

  //   return () => clearInterval(intervalId); 
  // }, [fromCurrency, toCurrency]);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {

      if (window.TradingView && chartContainerRef.current) {
        new window.TradingView.widget({
          container_id: chartContainerRef.current.id,  
          symbol: `${fromCurrency}${toCurrency}`,
          // interval: 'D',
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          height: 500,
          hide_side_toolbar: true,
          width: '100%',
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = '';  
      }
    };
  }, [fromCurrency, toCurrency]);
  return (
    <div className="w-full px-2">
      {/* <h2 className='text-white/60'>{fromCurrency}/{toCurrency} Real-Time Price: {price ? price : 'Loading...'}</h2> */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div id="tradingview-chart" ref={chartContainerRef} className="w-full h-full px-[-48px]"></div>
    </div>
  );
};

export default TradingViewChart;
