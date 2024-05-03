import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm/browser";
import { AActivity } from "./abstract/AActivity";
import { EntertainmentSchedule } from "./EntertainmentSchedule";
import { EntertainmentType } from "./EntertainmentType";
import { Zone } from "./Zone";

@Entity('entertainment')
export class Entertainment extends AActivity {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @ManyToOne(() => Zone, zone => zone.entertainments)
  zone: Zone

  @OneToMany(() => EntertainmentSchedule, (es) => es.entertainement, { cascade: ['remove']})
  entertainmentSchedules: EntertainmentSchedule[]

  @ManyToOne(() => EntertainmentType, et => et.entertainments)
  entertainmentType: EntertainmentType
}
