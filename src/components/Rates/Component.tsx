import React, { useEffect, useMemo } from 'react'
import Chart from "react-apexcharts";
import { TReduxProps } from './Container'
import { StyledContainer } from './style'
import Loader from 'components/Loader/Loader'
import { Select } from 'antd';
import ErrorRequestMessage from './ErrorRequestMessage/ErrorRequestMessage';

export type TComponentProps = {
} & TReduxProps

type curencyArrayType = {
  Cur_ID:number  
  Cur_Abbreviation: string
}

const Rates: React.FC<TComponentProps> = (props) => {
  const { Option } = Select;

  const curencyArray: curencyArrayType[] = [
    {Cur_ID:145,  Cur_Abbreviation: 'USD'},
    {Cur_ID:298,  Cur_Abbreviation: 'RUR'},
    {Cur_ID:292,  Cur_Abbreviation: 'EUR'},
  ]
  

  const chartOptions = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: props.chartSeries.map(data=> data.Date)
    }
  }

  const chartSeries = [
    {
      name: "rates",
      data: props.chartSeries.map(data=>data.Cur_OfficialRate)
    }
  ]

  const changeHandlerCurrency = (e)=> {
    props.dispatch(props.setCurrency(e))
  }
  
  const changeHandlerPeriod = (e)=> {
    props.dispatch(props.setPerriod(e))
  }

  async function startDataFunction() {
    props.dispatch(props.startFetching())
    await props.dispatch(await props.getChartSeries(props.chartSelectedCurency, props.chartSelectedPeriod))
    props.dispatch(props.stopFetching())
  }

  useEffect(() => {
    startDataFunction();
  }, []);

  useEffect(() => {
      startDataFunction();
  }, [props.chartSelectedCurency, props.chartSelectedPeriod]);


  return (
    <StyledContainer>
      {props.fetching ? <Loader /> : ''}
      {props.errorRequest ? <ErrorRequestMessage /> 
      :<>
      <>
        <Chart
        options={chartOptions}
        series={chartSeries}
        type = "line"
        width='900'
        />    
      </>
      <div style={{ display: 'flex' }}>
        <div>
          curency:<br/> 
          <Select style={{ width: 120 }} value={props.chartSelectedCurency} onChange={changeHandlerCurrency}>
            {curencyArray.map(item =><Option key={item.Cur_ID} value={item.Cur_ID}>{item.Cur_Abbreviation}</Option> )}
          </Select>
        </div>
        <div style={{ marginLeft: '20px' }}>
          period:<br/> 
          <Select style={{ width: 120 }} value={props.chartSelectedPeriod} onChange={changeHandlerPeriod}>
            <Option key={1} value={"month"}>per month</Option>
            <Option key={2} value={"year"}>in 365 days</Option>
          </Select>
        </div>
      </div>
      </>
    }
    </StyledContainer>
  )
}

export default Rates