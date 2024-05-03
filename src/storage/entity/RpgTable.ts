import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm/browser";
import { AActivitySchedule } from "./abstract/AActivitySchedule";
import { RpgActivity } from "./RpgActivity";
import { RpgReservation } from "./RpgReservation";

@Entity('rpg_table')
export class RpgTable extends AActivitySchedule {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => RpgActivity, rpgActivity => rpgActivity.rpgTables)
  rpgActivity: RpgActivity

  @OneToMany(() => RpgReservation, rpgReservation => rpgReservation.rpgTable, { cascade: ['remove'] })
  rpgReservations: RpgReservation[]
}