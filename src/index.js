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
    innerRef,
    location,
    history,
    staticContext,
    swipeRight,
    swipeLeft,
    swipeAll,
    duration,
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

  // Trigger the location change to the route path
  const handleIndexChange = (index) => {
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
      this.slider.slickPrev();
      return true;
    }
    return false;
  };

  const slideRight = (activate) => {
    if (activate) {
      changeSlideIndex(2);
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

  // Did mount
  useEffect(() => {
    const { history } = props;
    changeRouteHas(renderableRoutes.some(route => route.props.path === location.pathname));
    triggerOnChangeIndex(history.location);
  }, []);

  // Did update
  useEffect(() => {
    // If there's no match, render the first route with no params
    let match;
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      match = matchPath(location.pathname, { path, exact, strict });
      if (match) {
        changeSlideIndex(index);
      }
    });
  });

  return (
    <React.Fragment>
      {swipeLeft && routeHas && <section {...handlers} className="router-carousel-zone router-carousel-zone--left"></section>}
      {swipeRight && routeHas && <section {...handlers} className="router-carousel-zone router-carousel-zone--right">RRRRIIIIIIII</section>}
      {routeHas && <SwipeableViews
        index={slideIndex}
        onChangeIndex={handleIndexChange}
      >
        {renderableRoutes.map((element, index) => {
          const { path, component, render, children } = element.props;
          const props = { location, history, staticContext };
          props.key = path;

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
      </SwipeableViews>}
    </React.Fragment>
  );
};

export default withRouter(RouterCarousel);
