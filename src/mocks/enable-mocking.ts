export async function enableMocking() {
  const { worker } = await import('@/mocks/browser')

  return worker.start({
    onUnhandledFrame: 'bypass',
  })
}
