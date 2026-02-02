import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm/browser";
import { Paymentable } from "./Paymentable";

@Entity('price')
export class Price {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'int'})
  value: number

  @Column({ type: 'varchar', nullable: true })
  priceCondition?: string

  @ManyToOne(() => Paymentable, paymentable => paymentable.prices)
  paymentable: Paymentable
}