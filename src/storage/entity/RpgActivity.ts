import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm/browser";
import { AActivity } from "./abstract/AActivity";
import { RpgZone } from "./RpgZone";
import { RpgTable } from "./RpgTable";
import { Tag } from "./Tag";
import { TriggerWarning } from "./TriggerWarning";
import { Rpg } from "./Rpg";
import { User } from "./User";

@Entity('rpg_activity')
export class RpgActivity extends AActivity {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => RpgZone, rpgZone => rpgZone.rpgActivities)
  rpgZone: RpgZone

  @OneToMany(() => RpgTable, rpgTable => rpgTable.rpgActivity, { cascade: ['remove'] })
  rpgTables: RpgTable[]

  @ManyToMany(() => Tag, tag => tag.rpgActivities, { cascade: ['insert', 'update'] })
  tags: Tag[]

  @ManyToMany(() => TriggerWarning, tw => tw.rpgActivities, { cascade: ['insert', 'update'] })
  triggerWarnings: TriggerWarning[]

  @ManyToOne(() => Rpg, rpg => rpg.rpgActivities)
  rpg: Rpg

  @ManyToOne(() => User, user => user.rpgActivities)
  user: User
}
