import { Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { AActvityReservation } from "./abstract/AActivityReservation";
import { RpgTable } from "./RpgTable";

@Entity('rpg_reservation')
export class RpgReservation extends AActvityReservation {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => RpgTable, rpgTable => rpgTable.rpgReservations)
  rpgTable: RpgTable
}
