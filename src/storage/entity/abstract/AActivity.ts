import { Column } from "typeorm";

export abstract class AActivity {
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ nullable: true, type: 'int' })
  maxNumberSeats: number

  @Column({ nullable: true, type: 'int' })
  duration: number  

  @Column({ default: false, type: 'boolean' })
  onReservation = false

  @Column({ default: false, type: 'boolean' })
  isCanceled = false
}