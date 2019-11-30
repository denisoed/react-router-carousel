# React Router Carousel(alpha@0.0.8)

[![Developed by Mad Devs](https://maddevs.io/badge-dark.svg)](https://maddevs.io)
&nbsp;

## Installation

```bash
npm install --save react-router-carousel
```

## Example

```js
import React, { Component } from 'react';
import RouterCarousel from 'react-router-carousel';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

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

export default class App extends Component {
	return (
		<Router>
			<Route path="/map" component={Map} />
			<RouterCarousel
				swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
				swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
			>
				<Route path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} swipeleft swiperight />
				<Route path="/profile" component={Profile} />
			</RouterCarousel>
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

|    Property    | Type |          Description          | Default |
| -------------  | ---- |          -----------          | ------- |
| sliderMode  | bool | Normal carousel mode. `Router will not switch` | false |
| swipeLeftClassName  | string | Custom className for swipe left zone | null |
| swipeRightClassName  | string | Custom className for swipe right zone | null |

## Props for slide

|    Property    | Type |          Description          | Default |
| -------------  | ---- |          -----------          | ------- |
| index  | number | Set active slider. Work only props `sliderMode` | 1 |
| swipeleft  | bool | Enable swipe left zone. If uses with props `sliderMode` add `true` or `false` - `swipeleft="true"` | false |
| swiperight  | bool | Enable swipe right zone. If uses with props `sliderMode` add `true` or `false` - `swiperight="true"` | false |
