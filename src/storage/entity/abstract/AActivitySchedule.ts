import { Column } from "typeorm/browser";

export abstract class AActivitySchedule {
  @Column({ nullable: true, type: 'int' })
  duration: number

  @Column({ type: 'varchar' })
  start: string

  @Column({ type: 'boolean', default: () => false })
  isCanceled: boolean = false

  @Column({ type: 'int' })
  availableSeats: number
}