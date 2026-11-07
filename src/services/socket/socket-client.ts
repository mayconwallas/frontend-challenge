import {
  io,
  type Socket,
} from 'socket.io-client'

import type { ServerToClientEvents } from '@/services/socket/socket-events'
import { socketConfig } from '@/services/socket/socket-config'

export const socketClient: Socket<
  ServerToClientEvents
> = io(socketConfig.url, {
  autoConnect: false,
})