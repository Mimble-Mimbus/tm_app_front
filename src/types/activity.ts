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

export interface RpgActivity {
  id: number
  name: string
  description: string
  schedules: Schedule[]
  userGm: UserGm
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
  schedules: Schedule[]
  entertainmentType: EntertainmentType
}

export interface IActivities {
  rpgActivities: RpgActivity[]
  entertainments: Entertainment[]
}
