import React, { Component } from 'react'
import RouterCarousel from 'react-router-carousel'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import AuthHoc from './AuthHoc';

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
    <NavLink to="/map" activeClassName="activeRoute">Map</NavLink>
  </div>
);
const Contact = () => (
  <div style={{ width: '100%', height: 540, position: 'relative' }}>
    <h1>Contact page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <section style={{ width: '70%', height: 70, position: 'relative', margin: '0 auto' }}>
      <RouterCarousel
        sliderMode
        index="1"
        swipeLeftClassName={"router-carousel-zone router-carousel-zone--left"}
        swipeRightClassName={"router-carousel-zone router-carousel-zone--right"}
      >
        <h2 swipeleft="false" swiperight="true">EMail</h2>
        <h2>Phone number</h2>
        <h2>Address</h2>
      </RouterCarousel>
    </section>
  </div>
);
const Profile = () => {
  return (
    <div style={{ width: '100%', height: 540 }}>
      <h1>Profile page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  )
};
const Map = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Map page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
);
const Login = ({ match }) => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Login page</h1>
    <h3>React Hoc is works!</h3>
    <p>If the user is not authorized, it will be transferred to the authorization page</p>
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
      <React.Fragment>
        <h1>React Router Carousel</h1>
        <div style={
          {
            textAlign: 'center',
            width: '98%',
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
            <Route path="/map" component={Map} />
            <Route path="/login" component={Login} />
            <RouterCarousel
              swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
              swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
            >
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} swipeleft swiperight />
              <Route path="/profile" component={AuthHoc(Profile)} />
            </RouterCarousel>
            <div className="menu">
              <NavLink exact to="/" activeClassName="activeRoute">Home</NavLink>
              <NavLink to="/about" activeClassName="activeRoute">About</NavLink>
              <NavLink to="/contact" activeClassName="activeRoute">Contact</NavLink>
              <NavLink to="/profile" activeClassName="activeRoute">Profile</NavLink>
            </div>
          </Router>
        </div>
      </React.Fragment>
    )
  }
}
