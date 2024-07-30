import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { Event } from "./Event";
import { Zone } from "./Zone";

@Entity('quest')
export class Quest {
  @PrimaryColumn({ type: 'int', unique: true })
  id: number

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar' })
  infos: string

  @ManyToOne(() => Event, event => event.quests)
  event: Event

  @ManyToOne(() => Zone, zone => zone.quests)
  zone: Zone

  @Column({ default: false, type: 'boolean' })
  isFullFilled: boolean

  @Column({ type: 'varchar' })
  type: string

  @Column({ type: 'int' })
  points: number
}
