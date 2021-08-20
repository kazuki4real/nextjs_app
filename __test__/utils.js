import { render as defaultRender } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React from 'react'

export function render(children) {
  const mockRouter = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '/',
    isLocaleDomain: true,
    isReady: true,
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isPreview: false,
  }

  return defaultRender(
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>,
  )
}
