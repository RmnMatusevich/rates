import { IAction, IAppState, TAppDispatchThunk } from 'store'
import RequestService, { getChartSeriesPeriod, formatRequestDate } from '../api/RequestService'

const MODULE_NAME = 'COMMON'

export const START_FETCHING = `${MODULE_NAME}/START_FETCHING`
export const STOP_FETCHING = `${MODULE_NAME}/STOP_FETCHING`
export const SET_CHART_SERIES = `${MODULE_NAME}/SET_CHART_SERIES`
export const SET_CHART_CURRENCY = `${MODULE_NAME}/SET_CHART_CURRENCY`
export const SET_CHART_PERRIOD = `${MODULE_NAME}/SET_CHART_PERRIOD`
export const SET_ERROR = `${MODULE_NAME}/SET_ERROR`

export const startFetching = (): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  dispatch({
    type: START_FETCHING,
  })
}

export const stopFetching = (): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  dispatch({
    type: STOP_FETCHING,
  })
}

export const setCurrency = (currency : number): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  dispatch({
    type: SET_CHART_CURRENCY,
    currency
  });
}

export const setPerriod = (period:getChartSeriesPeriod): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  dispatch({
    type: SET_CHART_PERRIOD,
    period
  })
}

export const getChartSeries = (currency : number, period: getChartSeriesPeriod = 'month' ): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  const chartSeries : any = await RequestService.getChartSeries(currency, period);
  
  if(!chartSeries.error){
    let data = chartSeries.data.map(o =>{
      o.Date = formatRequestDate(new Date(o.Date))
      return o
    })
    
    dispatch({
      type: SET_CHART_SERIES,
      payload: data
    });
  }else{
    dispatch({
      type: SET_ERROR,
    })
  }
};

