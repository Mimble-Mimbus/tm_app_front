import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";

@Entity('open_day')
export class OpenDay {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Event, event => event.opendays)
  event: Event

  @Column({ type: 'datetime'})
  dayStart: Date

  @Column({ type: 'datetime'})
  dayEnd: Date
}