export interface ApiErrorResponse {
  code: string
  message: string
  field?: string
  details?: Record<string, unknown>
}
