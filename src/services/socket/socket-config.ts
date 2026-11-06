export const socketConfig = {
  url: import.meta.env.VITE_SOCKET_URL ?? window.location.origin,
} as const