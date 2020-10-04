import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import routeHistory from 'route-history'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import "antd/dist/antd.css";
import styled from 'styled-components'

import NotFound from './NotFound'
import Rates from './Rates'
import Header from './Header'

const { Content } = Layout

function App() {
  return (
    <ConnectedRouter history={routeHistory}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>Rates</Header>
        <Layout>
          <Content>
            <Switch>
              <Route exact path="/" component={Rates} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </ConnectedRouter>
  )
}

export default styled(App)`
    background:#001529;
  .ant-layout-header{
    height:60px;
    background:#001529;
    display:flex;
    align-items:center;
  }
`
