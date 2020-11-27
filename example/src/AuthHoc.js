import React, { PureComponent } from 'react'
import { Redirect } from 'react-router'

export default function Hoc(HocComponent) {
  return class extends PureComponent {
    render() {
      return !localStorage.getItem('accessToken') ? (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      ) : (
        <HocComponent />
      )
    }
  }
}
