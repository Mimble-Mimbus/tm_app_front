interface Price {
  price: number
  priceCondition?: string
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
  id: number
  paymentables: Paymentable[]
  transits: Transit[]
  openDays: OpenDay[]
  address: string
}

export interface Event {
  id: number
  rpgZone: { id: number }
}
