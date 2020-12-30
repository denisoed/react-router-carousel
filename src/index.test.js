import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { wait } from './helpers/tests';

import ReactRouterCarousel from './index';

describe('React Router Carousel', () => {
  afterEach(cleanup);

  it('render simple carousel without router change', async () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <ReactRouterCarousel sliderMode>
          <div data-testid='slider-mode-slide'>Slide 1</div>
          <div data-testid='slider-mode-slide'>Slide 2</div>
          <div data-testid='slider-mode-slide'>Slide 3</div>
        </ReactRouterCarousel>
      </BrowserRouter>
    );
    await wait();
    const sliderModeSlides = getAllByTestId('slider-mode-slide');
    expect(sliderModeSlides.length).toBe(3);
  });
});
