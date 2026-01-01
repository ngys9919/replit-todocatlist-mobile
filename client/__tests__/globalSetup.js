// Setup global window.location before jest-expo loads
const windowMock = {
  location: {
    protocol: 'http:',
    hostname: 'localhost',
    host: 'localhost:8081',
    port: '8081',
    href: 'http://localhost:8081',
    origin: 'http://localhost:8081',
    pathname: '/',
    search: '',
    hash: '',
  },
  navigator: {
    userAgent: 'node.js',
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
};

global.window = windowMock;
global.location = windowMock.location;

// Ensure setTimeout and other timers are available globally
if (typeof global.setTimeout === 'undefined') {
  global.setTimeout = globalThis.setTimeout;
  global.clearTimeout = globalThis.clearTimeout;
  global.setInterval = globalThis.setInterval;
  global.clearInterval = globalThis.clearInterval;
}

if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn) => setTimeout(fn, 0);
  global.clearImmediate = clearTimeout;
}
