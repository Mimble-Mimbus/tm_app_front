import { Entity, ManyToMany, PrimaryColumn } from "typeorm/browser";
import { RpgActivity } from "./RpgActivity";
import { Rpg } from "./Rpg";

@Entity('trigger_warning')
export class TriggerWarning {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToMany(() => RpgActivity, rpgActivity => rpgActivity.tags) 
  rpgActivities: RpgActivity[]

  @ManyToMany(() => Rpg, rpg => rpg.triggerWarnings)
  rpgs: Rpg[]
}