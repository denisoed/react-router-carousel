import React, { Component } from 'react'
import RouterCarousel from 'react-router-carousel'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const RedView = () => (
  <div style={{ height: 300, backgroundColor: "red" }}>Red</div>
);
const BlueView = () => (
  <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>
);
const GreenView = () => (
  <div style={{ height: 300, backgroundColor: "green" }}>Green</div>
);
const YellowView = () => (
  <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>
);
const OtherColorView = ({ match }) => (
  <div style={{ height: 300, backgroundColor: match.params.color }}>
    {match.params.color}
  </div>
);

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const { } = this.state

    return (
      <div style={{textAlign: 'center', height: '100vh'}}>
        <Router>
          <RouterCarousel swipeRight>
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
            <Route path="/green" component={GreenView} />
            <Route path="/yellow" component={YellowView} />
          </RouterCarousel>
        </Router>
      </div>
    )
  }
}
