import { connect, ConnectedProps } from 'react-redux'

import { IAppState } from 'store'
import Component from './Component'
import { getChartSeries, startFetching, stopFetching, setCurrency, setPerriod } from 'actions/common'


const mapStateToProps = (state: IAppState) => ({
  fetching: state.common.fetching,
  chartSeries: state.common.chartSeries,
  chartSelectedPeriod: state.common.chartSelectedPeriod,
  chartSelectedCurency: state.common.chartSelectedCurency,
  errorRequest: state.common.errorRequest
})
const mapActionsToProps = (dispatch) => ({
  getChartSeries,
  startFetching,
  stopFetching,
  setCurrency,
  setPerriod,
  dispatch
})


const connector = connect(mapStateToProps, mapActionsToProps)
export type TReduxProps = ConnectedProps<typeof connector>
export default connector(Component)