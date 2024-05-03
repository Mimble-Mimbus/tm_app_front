import { RpgBase } from "./rpg"

export interface UserGm {
  id: number
  name: string
}

export interface Schedule {
  id: number
  start: string
  duration: number
  availableSeats: number
}

export interface ScheduleData {
  start: string
  duration: string
  maxNumberSeats: string
}

export interface ApiRpgActivity {
  id: number
  eventId: number
  rpgZoneId: number
  name: string
  rpg: RpgBase
  description: string
  schedules: Schedule[]
  userGm: UserGm
}

export interface ApiEntertainmentType {
  id: number
  name: string
  description?: string
}

export interface ApiEntertainment {
  eventId: number
  zoneId: number
  id: number
  name: string
  description: string
  schedules: Schedule[]
  entertainmentType: ApiEntertainmentType
}

export interface ApiActivities {
  rpgActivities: ApiRpgActivity[]
  entertainments: ApiEntertainment[]
}
