import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Zone } from "./Zone";
import { Quest } from "./Quest";
import { OpenDay } from "./OpenDay";
import { Paymentable } from "./Paymentable";
import { Transit } from "./Transit";

@Entity('event')
export class Event {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  address: string

  @OneToMany(() => Zone, zone => zone.event)
  zones: Zone[]

  @OneToMany(() => Quest, quest => quest.event)
  quests: Quest[]

  @OneToMany(() => OpenDay, openDay => openDay.event)
  opendays: OpenDay[]

  @OneToMany(() => Paymentable, paymentable => paymentable.event)
  paymentables: Paymentable[]

  @OneToMany(() => Transit, transit => transit.event)
  transits: Transit[]
}