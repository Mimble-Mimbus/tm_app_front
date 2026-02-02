import { Schedule } from "./activity"
import { ApiOpenDay } from "./event"

interface BaseRpgZone {
  id: number
  name: string
}
export interface RpgZone extends BaseRpgZone {
  id: number
  rpgTables: Schedule[]
  maxAvailableSeatsPerTable: number
  minStartHour: string
  maxEndHour: string
  availableTables: number
  openDays: ApiOpenDay[]
}

export interface ApiPartialRgpZone extends BaseRpgZone {
  zoneId: number
}