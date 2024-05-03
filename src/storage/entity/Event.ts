import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm/browser";
import { Zone } from "./Zone";
import { Quest } from "./Quest";
import { OpenDay } from "./OpenDay";
import { Paymentable } from "./Paymentable";
import { Transit } from "./Transit";
import { RpgZone } from "./RpgZone";

@Entity('event')
export class Event {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  address: string

  @OneToMany(() => Zone, zone => zone.event)
  zones: Zone[]

  @OneToMany(() => RpgZone, rpgZone => rpgZone.event, { cascade: ['insert', 'update'] })
  rpgZones: RpgZone[]

  @OneToMany(() => Quest, quest => quest.event)
  quests: Quest[]

  @OneToMany(() => OpenDay, openDay => openDay.event, { cascade: ['insert', 'update'] })
  opendays: OpenDay[]

  @OneToMany(() => Paymentable, paymentable => paymentable.event, { cascade: ['insert', 'update'] })
  paymentables: Paymentable[]

  @OneToMany(() => Transit, transit => transit.event, { orphanedRowAction: 'delete' })
  transits: Transit[]
}