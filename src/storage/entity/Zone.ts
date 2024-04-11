import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { AZone } from "./abstract/AZone";
import { Event } from "./Event";
import { RpgZone } from "./RpgZone";
import { Entertainment } from "./Entertainment";
import { Quest } from "./Quest";

@Entity('zone')
export class Zone extends AZone {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Event, event => event.zones)
  event: Event

  @OneToOne(() => RpgZone, rpgZone => rpgZone.zone)
  rpgZone: RpgZone

  @OneToMany(() => Quest, quest => quest.event)
  quests: Quest[]

  @OneToMany(() => Entertainment, entertainment => entertainment.zone)
  entertainments: Entertainment[]
}