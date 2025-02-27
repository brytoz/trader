import moment from "moment"
export function formatDate(isoDateString: string) {
    const momentDate = moment(isoDateString);
    
    return momentDate.format('ddd, MMM D, YYYY, h:mm:ss A');
    
}

export function calculatePnL(
    openedPrice: number,
    closedPrice: number,
    quantity: number,
    leverage: number = 1  
  ): number {
    const priceDifference = closedPrice - openedPrice;
  
    const pnlWithoutLeverage = priceDifference * quantity;
  
    const pnlWithLeverage = pnlWithoutLeverage * leverage;
  
    return pnlWithLeverage;
  }