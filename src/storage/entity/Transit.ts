import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
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

  @Column({ type: 'varchar'})
  start: string

  @Column({ type: 'varchar'})
  arrival: string
}