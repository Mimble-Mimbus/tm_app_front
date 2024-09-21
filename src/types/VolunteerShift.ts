import { ApiZone } from "./zone"

export interface ApiVolunteerShift {
    id: number
    description: string
    shiftStart: string
    shiftEnd: string
    zone: ApiZone
}
