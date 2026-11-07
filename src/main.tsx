import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import { QueryProvider } from '@/app/providers/query-provider'
import { enableMocking } from '@/mocks/enable-mocking'
import { connectSocket } from '@/services/socket/socket-lifecycle'
import { registerSocketQueryBridge } from '@/services/socket/socket-query-bridge'

import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function renderApplication() {
  registerSocketQueryBridge()
  connectSocket()

  createRoot(
    document.getElementById('root')!,
  ).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>,
  )
}

enableMocking().then(renderApplication)