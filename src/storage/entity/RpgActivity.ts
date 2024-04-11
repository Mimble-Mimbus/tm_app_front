import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { AActivity } from "./abstract/AActivity";
import { RpgZone } from "./RpgZone";
import { RpgTable } from "./RpgTable";
import { Tag } from "./Tag";
import { TriggerWarning } from "./TriggerWarning";
import { Rpg } from "./Rpg";

@Entity('rpg_activity')
export class RpgActivity extends AActivity {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => RpgZone, rpgZone => rpgZone.rpgActivities)
  rpgZone: RpgZone

  @OneToMany(() => RpgTable, rpgTable => rpgTable.rpgActivity)
  rpgTables: RpgTable[]

  @ManyToMany(() => Tag, tag => tag.rpgActivities)
  tags: Tag[]

  @ManyToMany(() => TriggerWarning, tw => tw.rpgActivities)
  triggerWarnings: TriggerWarning[]

  @ManyToOne(() => Rpg, rpg => rpg.rpgActivities)
  rpg: Rpg
}
