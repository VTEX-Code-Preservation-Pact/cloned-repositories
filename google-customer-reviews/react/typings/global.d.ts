interface Window extends Window {
  __google_customer_reviews: {
    merchantId: MerchantId
    passGtin: 'true' | 'false'
    optInStyle:
      | 'CENTER_DIALOG'
      | 'BOTTOM_RIGHT_DIALOG'
      | 'BOTTOM_LEFT_DIALOG'
      | 'TOP_RIGHT_DIALOG'
      | 'TOP_LEFT_DIALOG'
      | 'BOTTOM_TRAY'
    showBadge: 'true' | 'false'
    badgePosition: 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'INLINE'
  }
  gapi: GoogleAPI
  renderOptIn: () => void
}

type MerchantId = string

interface GoogleAPI {
  load: (event: string, callback: () => void) => void
  ratingbadge: {
    render: (element: HTMLDivElement, params: RatingBadgeParams) => void
  },
  surveyoptin: {
    render: (params: SurveyParams) => void
  }
}

interface SurveyParams {
  merchant_id: MerchantId
  order_id: string
  email: string
  delivery_country: string
  estimated_delivery_date: string
  products?: SurveyProducts[]
  opt_in_style?:
    | 'CENTER_DIALOG'
    | 'BOTTOM_RIGHT_DIALOG'
    | 'BOTTOM_LEFT_DIALOG'
    | 'TOP_RIGHT_DIALOG'
    | 'TOP_LEFT_DIALOG'
    | 'BOTTOM_TRAY'
}

interface SurveyProducts {
  gtin: string
}

interface RatingBadgeParams {
  merchant_id: MerchantId
  position: 'BOTTOM_RIGHT' | 'BOTTOM_LEFT' | 'INLINE'
}
