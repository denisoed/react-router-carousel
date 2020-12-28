import React from 'react';
import RouterCarousel from 'react-router-carousel';
import { Route, NavLink, Switch } from 'react-router-dom';
import AuthHoc from './AuthHoc';

// Components
const Home = () => (
  <div style={{ width: '100%', height: 440 }}>
    <h1>Home page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
);
const About = () => (
  <div style={{ width: '100%', height: 440 }}>
    <h1>About page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <NavLink to='/map' activeClassName='activeRoute'>
      Map
    </NavLink>
  </div>
);
const Contact = ({ history, location }) => (
  <div style={{ width: '100%', height: 440, position: 'relative' }}>
    <h1>Contact page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <section
      style={{
        width: '70%',
        height: 70,
        position: 'relative',
        margin: '0 auto'
      }}
    >
      <RouterCarousel
        sliderMode
        index="1"
        swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
        swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
        history={history}
        location={location}
      >
        <h2 swipeleft='false' swiperight='true'>
          EMail
        </h2>
        <h2>Phone number</h2>
        <h2>Address</h2>
      </RouterCarousel>
    </section>
  </div>
);
const Profile = () => {
  return (
    <div style={{ width: '100%', height: 440 }}>
      <h1>Profile page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
};
const Map = () => (
  <div style={{ width: '100%', height: 440 }}>
    <h1>Map page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
);
const Login = () => (
  <div style={{ width: '100%', height: 440 }}>
    <h1>Login page</h1>
    <h3>React Hoc is works!</h3>
    <p>
      If the user is not authorized, it will be transferred to the authorization
      page
    </p>
  </div>
);

const FallbackPage = () => {
  return (
    <div style={{ width: '100%', height: 440 }}>
      <h1>404 page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
};

const Carousel = ({ history, location }) => {
  return (
    <RouterCarousel
      swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
      swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
      fallbackRoute={<FallbackPage />}
      history={history}
      location={location}
    >
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} swipeleft swiperight />
      <Route path='/profile' component={AuthHoc(Profile)} />
    </RouterCarousel>
  );
};

const App = () => {
  return (
    <>
      <h1>
        React Router Carousel
      </h1>
      <div
        style={{
          textAlign: 'center',
          width: '98%',
          height: 440,
          borderRadius: 10,
          border: '1px solid #222',
          padding: 20,
          boxSizing: 'border-box',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Switch>
          <Route path='/map' component={Map} />
          <Route path='/login' component={Login} />
          <Route path='*' component={Carousel} />
        </Switch>
        <div className='menu'>
          <NavLink exact to='/' activeClassName='activeRoute'>
            Home
          </NavLink>
          <NavLink to='/about' activeClassName='activeRoute'>
            About
          </NavLink>
          <NavLink to='/contact' activeClassName='activeRoute'>
            Contact
          </NavLink>
          <NavLink to='/profile' activeClassName='activeRoute'>
            Profile
          </NavLink>
        </div>
      </div>
      <p style={{
        width: '100%',
        padding: 10,
        boxSizing: 'border-box',
        textAlign: 'center',
        margin: 0
      }}>
        Please open the example on a mobile device or emulator in your browser(f12)
      </p>
    </>
  );
};

export default App;
