interface Price {
  price: number
  priceCondition: string | null
}

interface Paymentable {
  type: string
  priceDetails: Price[]
  name: string
}

export interface OpenDay {
  dayStart: string
  dayEnd: string
}

interface Transit {
  name: string,
  address: string,
  arrival: string,
  start: string,
  availableSeats: number
}

export interface EventInformations {
  id: string
  paymentables: Paymentable[]
  transits: Transit[]
  openDays: OpenDay[]
  address: string
}
