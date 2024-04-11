import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { AActivitySchedule } from "./abstract/AActivitySchedule";
import { Entertainment } from "./Entertainment";
import { EntertainmentReservation } from "./EntertainmentReservation";

@Entity('entertainment_schedule')
export class EntertainmentSchedule extends AActivitySchedule {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Entertainment, (entertainement) => entertainement.entertainmentSchedules)
  entertainement: Entertainment

  @OneToMany(() => EntertainmentReservation, er => er.entertainmentSchedule)
  entertainmentReservations: EntertainmentReservation[]
}