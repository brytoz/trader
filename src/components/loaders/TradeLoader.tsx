const TradeLoader = () => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
      <div className="flex items-center mt-4">
        <div>
          <div className="h-4.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700"></div>
      <div className="h-4.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center mt-4">
        <div>
          <div className="h-4.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TradeLoader;
