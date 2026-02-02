import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm/browser";
import { RpgActivity } from "./RpgActivity";
import { Tag } from "./Tag";
import { TriggerWarning } from "./TriggerWarning";

@Entity('rpg')
export class Rpg {
  @PrimaryColumn({ type: 'int', unique: true })
  id: number

  @Column({ type: 'text' })
  description: string

  @Column({ length: 255, type: 'varchar'})
  universe: string

  @Column({ length: 255, type: 'varchar'})
  publisher: string

  @Column({ length: 255, type: 'varchar'})
  name: string

  @OneToMany(() => RpgActivity, rpgActivity => rpgActivity.rpg) 
  rpgActivities: RpgActivity[]

  @ManyToMany(() => Tag, tag => tag.rpgs)
  tags: Tag[]

  @ManyToMany(() => TriggerWarning, tw => tw.rpgs)
  triggerWarnings: TriggerWarning[]
}