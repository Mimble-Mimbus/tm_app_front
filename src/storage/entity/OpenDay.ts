import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { Event } from "./Event";

@Entity('open_day')
export class OpenDay {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Event, event => event.opendays)
  event: Event

  @Column({ type: 'varchar'})
  dayStart: string

  @Column({ type: 'varchar'})
  dayEnd: string
}