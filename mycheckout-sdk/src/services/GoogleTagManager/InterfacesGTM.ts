export interface ProductGTM {
  name: string
  id: string
  price: number
  brand: unknown
  category: string
  variant: string
  quantity: number
}

export interface StepGTM {
  step: number
  option?: string
}

export interface StepsCookieGTM {
  steps: StepGTM[]
}
