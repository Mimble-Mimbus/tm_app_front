import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Paymentable } from "./Paymentable";

@Entity('price')
export class Price {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  price: number

  @Column({ type: 'varchar', nullable: true })
  priceCondition?: string

  @ManyToOne(() => Paymentable, paymentable => paymentable.prices)
  paymentable: Paymentable
}