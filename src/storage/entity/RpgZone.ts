import { Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { AZone } from "./abstract/AZone";
import { Zone } from "./Zone";
import { RpgActivity } from "./RpgActivity";

@Entity('rpg_zone')
export class RpgZone extends AZone {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @OneToOne(() => Zone, (zone) => zone.rpgZone)
  zone: Zone

  @OneToMany(() => RpgActivity, rpgActivity => rpgActivity.rpgZone)
  rpgActivities: RpgActivity[]
}