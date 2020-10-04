import React from 'react'
import { StyledContainer } from './style'
import Spin from 'antd/lib/spin'

export type TComponentProps = {
}

const Loader: React.FC<TComponentProps> = () => {
  return (
    <StyledContainer>
      <Spin tip="Loading..." size="large"/>
    </StyledContainer>
  )
}

export default Loader