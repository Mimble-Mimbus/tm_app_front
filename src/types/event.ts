import { ApiPartialRgpZone } from "./rpgZone"
import { ApiZone } from "./zone"

interface ApiPrice {
  id: number
  price: number
  priceCondition?: string
}


interface ApiTypePaymentable {
  id: number
  name: string
}
interface ApiPaymentable {
  id: number
  typePaymentable: ApiTypePaymentable
  priceDetails: ApiPrice[]
  name: string
}

export interface ApiOpenDay {
  id: number
  dayStart: string
  dayEnd: string
}

interface Transit {
  id: number
  name: string,
  address: string,
  arrival: string,
  start: string,
  availableSeats: number
}

export interface ApiEvent {
  id: number
  paymentables: ApiPaymentable[]
  transits: Transit[]
  openDays: ApiOpenDay[]
  address: string
}
export interface ApiBaseEvent {
  address: string
  id: number
  rpgZones: ApiPartialRgpZone[]
  zones: ApiZone[]
}
