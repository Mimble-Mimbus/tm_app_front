export interface UserGm {
  id: number
  name: string
}

export interface RpgTable {
  id: string
  start: string
  duration: number
}

export interface RpgActivity {
  id: number
  name: string
  description: string
  rpgTables: RpgTable[]
  userGm: UserGm
}

export interface EntertainmentSchedule {
  id: number
  start: string
  duration: number
  availableSeats: number
}

export interface EntertainmentType {
  id: number
  name: string
  description: string
}

export interface Entertainment {
  id: number
  name: string
  description: string
  entertainmentSchedules: EntertainmentSchedule[]
  entertainmentType: EntertainmentType
}