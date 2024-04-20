import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPageDisconnect() {
  const error = useRouteError()
  // console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops! Disconnect</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {
            // @ts-ignore
            error.statusText || error.message
          }
        </i>
      </p>
    </div>
  )
}
