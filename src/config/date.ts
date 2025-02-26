import moment from "moment"
export function formatDate(isoDateString: string) {
    const momentDate = moment(isoDateString);
    
    return momentDate.format('ddd, MMM D, YYYY, h:mm:ss A');
    
}
