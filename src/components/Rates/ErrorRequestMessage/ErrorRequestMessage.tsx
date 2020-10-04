import React from 'react'
import { StyledContainer } from './style'
import { Alert } from 'antd'

export type TComponentProps = {
}

const ErrorRequestMessage: React.FC<TComponentProps> = () => {
  return (
    <StyledContainer>
       <Alert message="Oups! An error occurred while loading data. Try restarting your browser" type="error" />
    </StyledContainer>
  )
}

export default ErrorRequestMessage