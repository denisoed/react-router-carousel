import React, { useEffect, useState } from 'react';
import { matchPath, withRouter } from 'react-router';
import { useSwipeable } from 'react-swipeable';
import SwipeableViews from 'react-swipeable-views';
import generatePath from './helpers/generatePath';

const RouterCarousel = (props) => {
  const [urls, changeUrls] = useState([]);
  const [slideIndex, changeSlideIndex] = useState(0);
  const [routeHas, changeRouteHas] = useState(false);
  const [swipeleft, toggleSwipeLeft] = useState(false);
  const [swiperight, toggleSwipeRight] = useState(false);
  const [swipeall, toggleSwipeAll] = useState(false);

  const {
    children,
    index,
    location,
    history,
    replace,
    sliderMode,
    swipeLeftClassName,
    swipeRightClassName,
    fallbackRoute
  } = props;

  const nullElement = (
    <React.Fragment>
      <div />
    </React.Fragment>
  );
  const renderableRoutes = [];

  if (children?.length) {
    children.forEach(() => {
      renderableRoutes.push(nullElement);
    });
  } else {
    renderableRoutes.push(nullElement);
  }

  if (!sliderMode) {
    const slide = React.Children.toArray(children).find(
      (element) => element?.props?.path === location.pathname
    );
    renderableRoutes[slideIndex] = slide || nullElement;
  }

  const renderSlides = () => {
    return renderableRoutes.map((element) => {
      if (element?.props) {
        const { path, component, render, children } = element.props;
        const props = { location, history };

        let match = matchPath(location.pathname, element?.props);
        match = matchPath(
          generatePath(path, element?.props?.defaultParams),
          element?.props
        );

        props.match = match;
        props.key = path;

        return component
          ? React.createElement(component, props)
          : render
          ? render(props)
          : children;
      }
    });
  };

  const triggerOnChangeIndex = () => {
    React.Children.forEach(children, (element, i) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;
      if (matchPath(history.location.pathname, { path, exact, strict })) {
        changeUrls({ ...urls, [path]: history.location.pathname });
      }
    });
  };

  const createSlideUrl = (i) => {
    const {
      props: { path, defaultParams }
    } = React.Children.toArray(children)[i];

    let url;
    if (path.includes(':')) {
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

  const historyGoTo = (path) => {
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
      const numberOfSlides = !sliderMode
        ? renderableRoutes.length - 1
        : children.length - 1;
      const nextSlide =
        slideIndex < numberOfSlides ? slideIndex + 1 : numberOfSlides;
      changeSlideIndex(nextSlide);
      if (!sliderMode) {
        createSlideUrl(nextSlide);
      }
      return true;
    }
    return false;
  };

  const handlerLeftSwipe = useSwipeable({
    onSwipedRight: () => slideLeft(swipeleft),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handlerRightSwipe = useSwipeable({
    onSwipedLeft: () => slideRight(swiperight),
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

  const checkerSwipeOnSlide = () => {
    const mode = !sliderMode ? renderableRoutes : children;
    if (mode[slideIndex]?.props?.swipeleft) {
      toggleSwipeLeft(true);
    } else {
      toggleSwipeLeft(false);
    }
    if (mode[slideIndex]?.props?.swiperight) {
      toggleSwipeRight(true);
    } else {
      toggleSwipeRight(false);
    }
    if (
      mode[slideIndex]?.props?.swiperight ||
      mode[slideIndex]?.props?.swipeleft
    ) {
      toggleSwipeAll(true);
    } else {
      toggleSwipeAll(false);
    }
  };

  const swipeLeftButton = (
    <section {...handlerLeftSwipe} className={swipeLeftClassName} />
  );

  const swipeRightButton = (
    <section {...handlerRightSwipe} className={swipeRightClassName} />
  );

  // Did mount
  useEffect(() => {
    if (!sliderMode) {
      triggerOnChangeIndex();
      updateLocationPath();
    }
  }, []);

  useEffect(() => {
    if (!sliderMode) {
      updateLocationPath();
      changeRouteHas(
        renderableRoutes.some((route) => {
          if (route?.props?.path?.includes(':')) {
            const paramKey = Object.keys(route.props.defaultParams)[0];
            return (
              route.props.path.replace(
                ':' + paramKey,
                route.props.defaultParams[paramKey]
              ) === location.pathname
            );
          }
          return route?.props?.path === location.pathname;
        })
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    if (index && sliderMode) {
      const mode = !sliderMode ? renderableRoutes : children;
      const max = index >= mode?.length || index;
      const result = max >= 1 ? max - 1 : 1;
      changeSlideIndex(result);
    }
  }, [index]);

  // Did update
  useEffect(() => {
    checkerSwipeOnSlide();
  });

  return (
    <React.Fragment>
      {sliderMode && swipeleft && swipeLeftButton}
      {swipeleft && routeHas && swipeLeftButton}
      {!sliderMode && routeHas && (
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={handleIndexChange}
          disabled={swipeall}
        >
          {renderSlides()}
        </SwipeableViews>
      )}
      {(!routeHas && fallbackRoute) || null}
      {sliderMode && (
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={handleIndexChange}
          disabled={swipeall}
        >
          {children}
        </SwipeableViews>
      )}
      {swiperight && routeHas && swipeRightButton}
      {sliderMode && swiperight && swipeRightButton}
    </React.Fragment>
  );
};

export default withRouter(RouterCarousel);
