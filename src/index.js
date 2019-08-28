import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import { matchPath, withRouter } from "react-router";
import { useSwipeable } from 'react-swipeable'
import generatePath from "./generatePath";

const RouterCarousel = props => {
  const [urls, changeUrls] = useState([]);

  const {
    children,
    index,
    replace,
    innerRef,
    location,
    history,
    staticContext,
    swipeRight,
    swipeLeft,
    match: routeMatch,
    ...rest
  } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    draggable: false,
    accessibility: false,
  };

  const slideLeft = (activate) => {
    if (activate) {
      this.slider.slickPrev();
      return true;
    }
    return false;
  };
  
  const slideRight = (activate) => {
    if (activate) {
      this.slider.slickNext();
      return true;
    }
    return false;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slideLeft(swipeLeft),
    onSwipedRight: () => slideRight(swipeRight),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // If there's no match, render the first route with no params
  let matchedIndex = 0;
  let match;
  if (index) {
    matchedIndex = index;
  } else {
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      match = matchPath(location.pathname, { path, exact, strict });
      if (match) {
        matchedIndex = index;
      }
    });
  }

  const renderableRoutes = React.Children.toArray(children).filter(
    (element, index) =>
      !element.props.path.includes(":") ||
      Boolean(element.props.defaultParams) ||
      element.props.path in urls
  );

  return (
    <section>
      {swipeLeft && <section {...handlers} className="router-carousel-zone">Left</section>}
      {swipeRight && <section {...handlers} className="router-carousel-zone">Right</section>}
      <Slider ref={c => (this.slider = c)} {...settings}>
        {renderableRoutes.map((element, index) => {
          const { path, component, render, children } = element.props;
          const props = { location, history, staticContext };

          let match = matchPath(location.pathname, element.props);
          if (match) {
            match.type = "full";
          } else if (path in urls) {
            match = matchPath(urls[path], element.props);
            match.type = "outOfView";
          } else {
            match = matchPath(
              generatePath(path, element.props.defaultParams),
              element.props
            );
            match.type = "none";
          }
          props.match = match;
          props.key = path;

          // A lot of this code is borrowed from the render method of
          // Route. Why can't I just render the Route then?
          // Because Route only renders the component|render|children
          // if there's a match with the location, while here I render
          // regardless of the location.
          return component
            ? React.createElement(component, props)
            : render
            ? render(props)
            : children
            ? typeof children === "function"
              ? children(props)
              : !Array.isArray(children) || children.length // Preact defaults to empty children array
              ? React.Children.only(children)
              : null
            : null;
        })}
      </Slider>
      </section>
  );
};

export default withRouter(RouterCarousel);
