import { AnyAction } from 'redux'
import {
  START_FETCHING,
  STOP_FETCHING,
  SET_CHART_SERIES,
  SET_CHART_CURRENCY,
  SET_CHART_PERRIOD,
  SET_ERROR,
} from 'actions/common'
import { getChartSeriesPeriod } from 'src/api/RequestService';

const initState = {
  fetching: false as boolean,
  chartSeries: [] as any[],
  chartSelectedPeriod: "month" as getChartSeriesPeriod,
  chartSelectedCurency: 145 as number,
  errorRequest: false
}

export type ICommonState = typeof initState;

function commonReducer(state: ICommonState = initState, { type, payload = null, currency, period  }: AnyAction) {
  switch (type) {
    case START_FETCHING: {
      return {...state,
        fetching: true,
      }
    }
    case STOP_FETCHING: {
      return {...state,
        fetching: false,
      }
    }
    case SET_CHART_SERIES: {
      return {...state,
        chartSeries: payload
      }
    }
    case SET_CHART_CURRENCY: {
      return {...state,
        chartSelectedCurency: currency
      }
    }
    case SET_CHART_PERRIOD: {
      return {...state,
        chartSelectedPeriod: period 
      }
    }
    case SET_ERROR: {
      return {...state,
        errorRequest: true 
      }
    }
    default:
      return state
  }
}


export default commonReducer
