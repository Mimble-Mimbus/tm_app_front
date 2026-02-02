import { Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { AActvityReservation } from "./abstract/AActivityReservation";
import { EntertainmentSchedule } from "./EntertainmentSchedule";

@Entity('entertainment_reservation')
export class EntertainmentReservation extends AActvityReservation {
  @PrimaryColumn({ type: 'int', unique: true }) 
  id!: number

  @ManyToOne(() => EntertainmentSchedule, (es) => es.entertainmentReservations)
  entertainmentSchedule: EntertainmentSchedule
}