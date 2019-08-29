import React, { useEffect, useState } from 'react'
import { matchPath, withRouter } from "react-router";
import AliceCarousel from 'react-alice-carousel';
import { useSwipeable } from 'react-swipeable'
import generatePath from "./generatePath";
import "react-alice-carousel/lib/alice-carousel.css";

const RouterCarousel = props => {
  const [urls, changeUrls] = useState([]);
  const [routeHas, changeRouteHas] = useState(false);

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
    swipeAllZones,
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

  // Trigger the location change to the route path
  const handleIndexChange = (sliderData) => {
    const {
      props: { path, defaultParams }
    } = React.Children.toArray(children)[sliderData.slide];

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

    // Call the onChangeIndex if it's set
    if (typeof props.onChangeIndex === "function") {
      props.onChangeIndex(sliderData.slide);
    }
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
      this.slider.slideNext();
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
    triggerOnChangeIndex(history.location);
    const unlistenHistory = history.listen(location => {
      // When the location changes, call onChangeIndex with the route index
      triggerOnChangeIndex(location);
    });
    // If index prop changed, change the location to the path of that route
    if (props.index !== props.index) {
      const paths = React.Children.map(
        props.children,
        element => element.props.path
      );
      historyGoTo(paths[props.index]);
    }
  }, []);

  // Did update
  useEffect(() => {
    changeRouteHas(renderableRoutes.some(route => route.props.path === location.pathname));
  });  

  return (
    <React.Fragment>
      {swipeLeft && routeHas && <section {...handlers} className="router-carousel-zone router-carousel-zone--left"></section>}
      {swipeRight && routeHas && <section {...handlers} className="router-carousel-zone router-carousel-zone--right"></section>}
      {routeHas && <AliceCarousel
        mouseDragEnabled
        ref={c => (this.slider = c)}
        onSlideChanged={handleIndexChange}
        startIndex={matchedIndex}
        swipeDisabled={!swipeAllZones}
        dotsDisabled={true}
        buttonsDisabled={true}
      >
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
      </AliceCarousel>}
    </React.Fragment>
  );
};

export default withRouter(RouterCarousel);
