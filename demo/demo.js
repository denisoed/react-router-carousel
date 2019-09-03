import React, { Component } from 'react'
import RouterCarousel from 'react-router-carousel'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// Components
const Home = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Home page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
);
const About = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>About page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
);
const Contact = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Contact page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
);
const Profile = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Profile page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
);
const AboutPages = ({ match }) => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>About page: {match.params.id}</h1>
  </div>
);
const ProfilePages = ({match, title, text}) => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>{title}: {match.params.id}</h1>
    <p>{text}</p>
  </div>
);

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const {} = this.state
    return (
      <div style = {
        {
          textAlign: 'center',
          width: '100%',
          height: 540,
          borderRadius: 10,
          border: '1px solid #222',
          padding: 20,
          boxSizing: "border-box",
          margin: "0 auto",
          position: 'relative',
          overflow: 'hidden'
        }
      }>
        <Router>
          <Route path="/about/:id" component={AboutPages} />
          {/* <RouterCarousel swipeLeft swipeRight swipeAll>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
          </RouterCarousel> */}
          <RouterCarousel swipeLeft swipeRight swipeAll sliderMode>
            <h1>1111111111111111</h1>
            <h1>2222222222222222</h1>
            <h1>3333333333333333</h1>
            <h1>4444444444444444</h1>
          </RouterCarousel>
          {/* <RouterCarousel swipeLeft swipeRight>
            <Route
              path="/profile/:id"
              render={(props) => <ProfilePages {...props} title={'Update Profile'} text={"GO update profile"} />}
              defaultParams={{ id: 0 }} // important for slider
            /> 
          </RouterCarousel> */}
          <div className="menu">
            <NavLink exact to="/" activeClassName="activeRoute">Home</NavLink>
            <NavLink to="/about" activeClassName="activeRoute">About</NavLink>
            <NavLink to="/contact" activeClassName="activeRoute">Contact</NavLink>
            <NavLink to="/profile" activeClassName="activeRoute">Profile</NavLink>
          </div>
        </Router>
      </div>
    )
  }
}
