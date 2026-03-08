import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
})

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomainNext: false,
    isReady: true,
    isPreview: false,
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    domainLocales: undefined,
    pathname: '/',
    query: {},
    asPath: '/',
    route: '/',
  }),
}))

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

// Mock Next.js link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock Intersection Observer
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock navigator.share
Object.defineProperty(window, 'navigator', {
  writable: true,
  value: {
    ...window.navigator,
    share: jest.fn().mockResolvedValue(undefined),
  },
})

// Mock fetch
global.fetch = jest.fn()

// Mock console methods to reduce noise in tests
const originalError = console.error
const originalLog = console.log

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.log = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('act(...) is not supported')
    ) {
      return
    }
    originalLog.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.log = originalLog
})

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks()
  localStorageMock.clear()
  sessionStorageMock.clear()
})
