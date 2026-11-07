export interface QuoteRequest {
  coupon?: string
}

export interface QuoteResponse {
  subtotalEth: string
  discountEth: string
  networkFeeEth: string
  totalEth: string
  coupon?: string
}