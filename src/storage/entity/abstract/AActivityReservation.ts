import { Column } from "typeorm/browser";

export abstract class AActvityReservation {
  @Column({ length: 255, type: 'varchar' })
  name: string

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string

  @Column({ type: 'int' })
  booking: number
}