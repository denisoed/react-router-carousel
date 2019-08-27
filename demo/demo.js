import React, { Component } from 'react'
import { RouterCarousel } from 'react-router-carousel'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      default: null
    }
  }

  render () {
    const { default } = this.state

    return (
      <div style={{textAlign: 'center', height: '100vh'}}>
        <RouterCarousel />
      </div>
    )
  }
}
