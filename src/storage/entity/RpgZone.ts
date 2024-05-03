import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm/browser";
import { AZone } from "./abstract/AZone";
import { Zone } from "./Zone";
import { RpgActivity } from "./RpgActivity";
import { Event } from "./Event";

@Entity('rpg_zone')
export class RpgZone extends AZone {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @OneToOne(() => Zone, (zone) => zone.rpgZone, { cascade: ['insert', 'update'], nullable: false })
  zone: Zone

  @OneToMany(() => RpgActivity, rpgActivity => rpgActivity.rpgZone, { cascade: ['remove']})
  rpgActivities: RpgActivity[]

  @ManyToOne(() => Event, event => event.rpgZones)
  event: Event
}