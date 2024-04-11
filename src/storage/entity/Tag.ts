import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { RpgActivity } from "./RpgActivity";
import { Rpg } from "./Rpg";

@Entity('tag')
export class Tag {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToMany(() => RpgActivity, rpgActivity => rpgActivity.tags) 
  rpgActivities: RpgActivity[]

  @ManyToMany(() => Rpg, rpg => rpg.tags)
  rpgs: Rpg[]
}