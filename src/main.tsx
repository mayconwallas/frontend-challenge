import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import { QueryProvider } from '@/app/providers/query-provider'
import { enableMocking } from '@/mocks/enable-mocking'

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

async function enableRealtime() {
  const [
    { connectSocket },
    { registerSocketQueryBridge },
  ] = await Promise.all([
    import(
      '@/services/socket/socket-lifecycle'
    ),
    import(
      '@/services/socket/socket-query-bridge'
    ),
  ])

  registerSocketQueryBridge()
  connectSocket()
}

function scheduleRealtime() {
  const startRealtime = () => {
    void enableRealtime()
  }

  if (document.readyState === 'complete') {
    startRealtime()
    return
  }

  window.addEventListener(
    'load',
    startRealtime,
    {
      once: true,
    },
  )
}

function renderApplication() {
  const rootElement =
    document.getElementById('root')

  if (!rootElement) {
    throw new Error(
      'Elemento raiz da aplicação não encontrado.',
    )
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>,
  )

  scheduleRealtime()
}

void enableMocking().then(renderApplication)