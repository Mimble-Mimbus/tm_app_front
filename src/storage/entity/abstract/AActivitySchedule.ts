import { Column } from "typeorm";

export abstract class AActivitySchedule {
  @Column({ nullable: true, type: 'int' })
  duration: number

  @Column({ type: 'datetime' })
  start: Date

  @Column({ type: 'boolean', default: () => false})
  isCanceled: boolean = false
}