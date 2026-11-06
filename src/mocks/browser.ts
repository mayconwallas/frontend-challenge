import { setupWorker } from 'msw/browser'

import { healthHandlers } from '@/mocks/handlers/health.handlers'

export const worker = setupWorker(...healthHandlers)