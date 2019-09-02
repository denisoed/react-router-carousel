import React, { useEffect, useState } from 'react'
import { matchPath, withRouter } from "react-router";
import { useSwipeable } from 'react-swipeable'
import SwipeableViews from 'react-swipeable-views';
import generatePath from "./generatePath";

const RouterCarousel = props => {
  const [urls, changeUrls] = useState([]);
  const [routeHas, changeRouteHas] = useState(false);
  const [slideIndex, changeSlideIndex] = useState(0);

  const {
    children,
    index,
    replace,
    location,
    history,
    staticContext,
    swipeRight,
    swipeLeft,
    swipeAll,
    match: routeMatch
  } = props;

  const triggerOnChangeIndex = location => {
    const { children } = props;
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;
      if (matchPath(location.pathname, { path, exact, strict })) {
        if (typeof props.onChangeIndex === "function") {
          props.onChangeIndex(index);
        }
        changeUrls({ ...urls, [path]: location.pathname });
      }
    });
  };

  const createSlideUrl = (index) => {
    const {
      props: { path, defaultParams }
    } = React.Children.toArray(children)[index];

    let url;
    if (path.includes(":")) {
      if (path in urls) {
        url = urls[path];
      } else {
        // Build url with defaults
        url = generatePath(path, defaultParams);
        changeUrls({ urls: { ...urls, [path]: url } });
      }
    } else {
      url = path;
    }
    historyGoTo(url);
  };

  // Trigger the location change to the route path
  const handleIndexChange = (index) => {
    createSlideUrl(index);
    changeSlideIndex(index);
  };

  const renderableRoutes = React.Children.toArray(children).filter(
    (element, index) =>
      !element.props.path.includes(":") ||
      Boolean(element.props.defaultParams) ||
      element.props.path in urls
  );

  const historyGoTo = path => {
    const { replace, history } = props;
    return replace ? history.replace(path) : history.push(path);
  };

  const slideLeft = (activate) => {
    if (activate) {
      const prevSlide = slideIndex > 0 ? slideIndex - 1 : 0;
      changeSlideIndex(prevSlide);
      createSlideUrl(prevSlide);
      return true;
    }
    return false;
  };

  const slideRight = (activate) => {
    if (activate) {
      const numberOfSlides = renderableRoutes.length - 1;
      const nextSlide = slideIndex < numberOfSlides ? slideIndex + 1 : numberOfSlides;
      changeSlideIndex(nextSlide);
      createSlideUrl(nextSlide);
      return true;
    }
    return false;
  };

  const handlerLeft = useSwipeable({
    onSwipedLeft: () => slideLeft(swipeLeft),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handlerRight = useSwipeable({
    onSwipedRight: () => slideRight(swipeRight),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const updateLocationPath = () => {
    let match;
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      match = matchPath(location.pathname, { path, exact, strict });
      if (match) {
        changeSlideIndex(index);
      }
    });
  };

  // Did mount
  useEffect(() => {
    const { history } = props;
    changeRouteHas(renderableRoutes.some(route => {
      if (route.props.path.includes(":")) {
        const paramKey = Object.keys(route.props.defaultParams)[0];
        return route.props.path.replace(":" + paramKey, route.props.defaultParams[paramKey]) === location.pathname;
      }
      return route.props.path === location.pathname;
    }));
    triggerOnChangeIndex(history.location);
    updateLocationPath();
  }, []);

  useEffect(() => {
    updateLocationPath();
  }, [location.pathname]);

  return (
    <React.Fragment>
      {swipeLeft && routeHas && <section {...handlerLeft} className="router-carousel-zone router-carousel-zone--left"></section>}
      {routeHas && <SwipeableViews
        index={slideIndex}
        onChangeIndex={handleIndexChange}
        disabled={swipeAll ? false : true}
      >
        {renderableRoutes.map((element, index) => {
          const { path, component, render, children } = element.props;
          const props = { location, history, staticContext };

          let match = matchPath(location.pathname, element.props);
          match = matchPath(
            generatePath(path, element.props.defaultParams),
            element.props
          );

          props.match = match;
          props.key = path;

          return component
            ? React.createElement(component, props)
            : render
            ? render(props)
            : children;
        })}
      </SwipeableViews>}
      {swipeRight && routeHas && <section {...handlerRight} className="router-carousel-zone router-carousel-zone--right"></section>}
    </React.Fragment>
  );
};

export default withRouter(RouterCarousel);
