# React Router Carousel(beta@0.1.0)

React carousel with the ability to switch routes, both with the usual swipe, and with the ability to add zones for swipe on the site

[![Developed by Mad Devs](https://maddevs.io/badge-dark.svg)](https://maddevs.io)
&nbsp;

## Issues
* `<Route path="*" component={FallbackPage} />` - ignores routes in the carousel. Please add the fallbackRoute prop for RouterCarousel with the 404 page component, as in the example below

## Installation

```bash
npm install --save react-router-carousel
```

## Example
`Look at the page url`<br>
![Alt Text](rrc.gif)

```js
import React, { Component } from 'react';
import RouterCarousel from 'react-router-carousel';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

// Components
const Home = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Home page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
  </div>
);

const About = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>About page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
    <NavLink to="/map" activeClassName="activeRoute">Map</NavLink>
  </div>
);

const Contact = () => (
  <div style={{ width: '100%', height: 540, position: 'relative' }}>
    <h1>Contact page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
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

const Profile = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Profile page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
  </div>
);

const Map = () => (
  <div style={{ width: '100%', height: 540 }}>
    <h1>Map page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
  </div>
);

const FallbackPage = () => {
  return (
    <div style={{ width: '100%', height: 540 }}>
      <h1>404 page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  )
};

const Carousel = () => {
  return (
    <RouterCarousel
      swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
      swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
      fallbackRoute={<FallbackPage />}
    >
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} swipeleft swiperight />
      <Route path="/profile" component={Profile} />
    </RouterCarousel>
  );
};

export default class App extends Component {
	return (
    <Router>
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="*" component={Carousel} />
      </Switch>
			<div className="menu">
				<NavLink exact to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/contact">Contact</NavLink>
				<NavLink to="/profile">Profile</NavLink>
			</div>
		</Router>
	);
};
```

> Example can be found in the demo/demo.js file

## Props for wrapp carousel

|    Property    | Type |          Description          | Default | Example | 
| -------------  | ---- |          -----------          | ------- | ------- |
| sliderMode  | bool | Standart carousel mode. `Router will not switch` | false |  |
| swipeLeftClassName  | string | Custom className for swipe left zone | null |  |
| swipeRightClassName  | string | Custom className for swipe right zone | null |  |
| fallbackRoute | component | If the entered route is not found this is the component that will be displayed | null | `<FallbackPage />` |

## Props for slide

|    Property    | Type |          Description          | Default |
| -------------  | ---- |          -----------          | ------- |
| index  | number | Set active slider. Work only props `sliderMode` | 1 |
| swipeleft  | bool | Enable swipe left zone. If uses with props `sliderMode` add `true` or `false` - `swipeleft="true"` | false |
| swiperight  | bool | Enable swipe right zone. If uses with props `sliderMode` add `true` or `false` - `swiperight="true"` | false |
