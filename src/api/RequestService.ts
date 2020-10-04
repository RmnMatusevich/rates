const API_BASE_URL = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics';

export type getChartSeriesPeriod = 'month' | 'year';

export function formatRequestDate(date: Date) : string{
    let month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

class RequestService {
    static async getChartSeries(currency: number, period: getChartSeriesPeriod) {
        try {
            let periodInNumber = period === 'month' ? 30  : 365;
            let now = new Date();
            let end = formatRequestDate(now)

            let startNumberDate = now.setDate(now.getDate() - periodInNumber);
            let start = formatRequestDate(new Date(startNumberDate))
            
            let url = `${API_BASE_URL}/${currency}?startDate=${start}&endDate=${end}`
            const response = await fetch(url);
            
            if(response.ok){
                return {
                    error: false,
                    data: await response.json()
                }
            }
        } catch (error) {
            console.error(error);
            return {
                error: true,
                message: error,
                data: []
            }
        }
    }
}

export default RequestService;