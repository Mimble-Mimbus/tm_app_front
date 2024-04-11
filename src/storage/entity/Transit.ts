import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Event } from "./Event";

@Entity('transit')
export class Transit {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  name: string
  
  @Column({ type: 'varchar', length: 255 })
  address: string

  @Column({ type: 'int'})
  availableSeats: number

  @ManyToOne(() => Event, event => event.transits)
  event: Event

  @Column({ type: 'datetime'})
  start: Date

  @Column({ type: 'datetime'})
  arrival: Date
}