import { http, HttpResponse } from 'msw/http'

export const healthHandlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({
      status: 'ok',
    })
  }),
]