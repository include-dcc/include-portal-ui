Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    // deprecated
    addEventListener: jest.fn(),

    addListener: jest.fn(),

    dispatchEvent: jest.fn(),

    matches: false,

    media: query,

    onchange: null,

    removeEventListener: jest.fn(),
    // deprecated
    removeListener: jest.fn(),
  })),
  writable: true,
});

// eslint-disable-next-line no-undef
global.ResizeObserver = require('resize-observer-polyfill');
