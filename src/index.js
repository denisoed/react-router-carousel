import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick"
import { useSwipeable, Swipeable } from 'react-swipeable'

const RouterCarousel = ({
    swipeLeft,
    swipeRight,
    zones
  }) => {

  var settings = {
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

  return (
    <section>
      {swipeLeft && <section {...handlers} className="router-carousel-zone">Left</section>}
      {swipeRight && <section {...handlers} className="router-carousel-zone">Right</section>}
      <Slider ref={c => (this.slider = c)} {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      </section>
  );
};

export {
  RouterCarousel
};