import React, { useCallback } from 'react'
import { goTo } from 'route-history'

const NotFound: React.FC = () => {
  const onClick = useCallback(() => goTo('/'), [])

  return (
    <div>
      404 Not found
    </div>
  )
}

export default NotFound