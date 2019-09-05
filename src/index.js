import React, { useEffect, useState } from 'react'
import { matchPath, withRouter } from "react-router";
import { useSwipeable } from 'react-swipeable'
import SwipeableViews from 'react-swipeable-views';
import generatePath from "./generatePath";

const RouterCarousel = props => {
  const [urls, changeUrls] = useState([]);
  const [slideIndex, changeSlideIndex] = useState(0);
  const [routeHas, changeRouteHas] = useState(false);

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
    sliderMode,
    match: routeMatch
  } = props;

  let renderableRoutes = null;

  if (!sliderMode) {
    renderableRoutes = React.Children.toArray(children).filter(
      (element) =>
      !element.props.path.includes(":") ||
      Boolean(element.props.defaultParams) ||
      element.props.path in urls
    );
  };

  const triggerOnChangeIndex = location => {
    const { children } = props;
    React.Children.forEach(children, (element, i) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;
      if (matchPath(location.pathname, { path, exact, strict })) {
        if (typeof props.onChangeIndex === "function") {
          props.onChangeIndex(i);
        }
        changeUrls({ ...urls, [path]: location.pathname });
      }
    });
  };

  const createSlideUrl = (i) => {
    const {
      props: { path, defaultParams }
    } = React.Children.toArray(children)[i];

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
  const handleIndexChange = (i) => {
    if (!sliderMode) {
      createSlideUrl(i);      
    }
    changeSlideIndex(i);
  };

  const historyGoTo = path => {
    const { replace, history } = props;
    return replace ? history.replace(path) : history.push(path);
  };

  const slideLeft = (activate) => {
    if (activate) {
      const prevSlide = slideIndex > 0 ? slideIndex - 1 : 0;
      changeSlideIndex(prevSlide);
      if (!sliderMode) {
        createSlideUrl(prevSlide);
      }
      return true;
    }
    return false;
  };

  const slideRight = (activate) => {
    if (activate) {
      const numberOfSlides = !sliderMode ? renderableRoutes.length - 1 : children.length - 1;
      const nextSlide = slideIndex < numberOfSlides ? slideIndex + 1 : numberOfSlides;
      changeSlideIndex(nextSlide);
      if (!sliderMode) {
        createSlideUrl(nextSlide);
      }
      return true;
    }
    return false;
  };

  const handlerLeft = useSwipeable({
    onSwipedRight: () => slideLeft(swipeLeft),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handlerRight = useSwipeable({
    onSwipedLeft: () => slideRight(swipeRight),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const updateLocationPath = () => {
    let match;
    React.Children.forEach(children, (element, i) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      match = matchPath(location.pathname, { path, exact, strict });
      if (match) {
        changeSlideIndex(i);
      }
    });
  };

  // Did mount
  useEffect(() => {
    if (!sliderMode) {
      const { history } = props;
      triggerOnChangeIndex(history.location);
      updateLocationPath();
    }
  }, []);

  useEffect(() => {
    if (!sliderMode) {
      updateLocationPath();
      console.log('!!!!!!!!!');
      
      changeRouteHas(renderableRoutes.some(route => {
        if (route.props.path.includes(":")) {
          const paramKey = Object.keys(route.props.defaultParams)[0];
          return route.props.path.replace(":" + paramKey, route.props.defaultParams[paramKey]) === location.pathname;
        }
        return route.props.path === location.pathname;
      }));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (index) {
      const mode = !sliderMode ? renderableRoutes : children;
      const max = index >= mode.length ? mode.length : index;
      const result = max >= 1 ? max - 1 : 1;
      changeSlideIndex(result);
      if (!sliderMode && routeHas) {
        createSlideUrl(result);
      }
    }
  }, [index]);

  return (
    <React.Fragment>
      {swipeLeft && routeHas && <section {...handlerLeft} className="router-carousel-zone router-carousel-zone--left"></section>}
      {routeHas && !sliderMode && routeHas && <SwipeableViews
        index={slideIndex}
        onChangeIndex={handleIndexChange}
        disabled={swipeAll ? false : true}
      >
        {renderableRoutes.map((element) => {
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
      {sliderMode && <SwipeableViews
        index={slideIndex}
        onChangeIndex={handleIndexChange}
        disabled={swipeAll ? false : true}
      >
        {children}
      </SwipeableViews>}
      {swipeRight && routeHas && <section {...handlerRight} className="router-carousel-zone router-carousel-zone--right"></section>}
    </React.Fragment>
  );
};

export default withRouter(RouterCarousel);
