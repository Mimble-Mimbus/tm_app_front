import { Schedule } from "./activity"
import { OpenDay } from "./event"

export interface RpgZone {
  id: number
  rpgTables: Schedule[]
  maxAvailableSeatsPerTable: number
  minStartHour: string
  maxEndHour: string
  availableTables: number
  openDays: OpenDay[]
}