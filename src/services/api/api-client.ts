import axios from 'axios'

import { apiConfig } from '@/services/api/api-config'

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
})