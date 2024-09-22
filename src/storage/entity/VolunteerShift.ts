import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { Zone } from "./Zone";
import { Event } from "./Event";

@Entity('volunteer_shift')
export class VolunteerShift {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Zone, zone => zone.volunteerShifts)
  zone: Zone

  @ManyToOne(() => Event, event => event.volunteerShifts)
  event: Event

  @Column('varchar')
  description: string

  @Column('varchar')
  shiftStart: string

  @Column('varchar')
  shiftEnd: string
}
