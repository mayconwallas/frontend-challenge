import { io } from 'socket.io-client'

import { socketConfig } from '@/services/socket/socket-config'

export const socketClient = io(socketConfig.url, {
  autoConnect: false,
})