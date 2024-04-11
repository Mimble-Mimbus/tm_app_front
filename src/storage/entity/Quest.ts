import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";
import { Zone } from "./Zone";

@Entity('quest')
export class Quest {
  @PrimaryColumn({ type: 'int', unique: true })
  id: number

  @ManyToOne(() => Event, event => event.quests)
  event: Event

  @ManyToOne(() => Zone, zone => zone.quests)
  zone: Zone
}