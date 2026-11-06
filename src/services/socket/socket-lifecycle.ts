import { socketClient } from '@/services/socket/socket-client'

export function connectSocket() {
  if (!socketClient.connected) {
    socketClient.connect()
  }
}

export function disconnectSocket() {
  if (socketClient.connected) {
    socketClient.disconnect()
  }
}
