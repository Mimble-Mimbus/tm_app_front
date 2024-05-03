import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm/browser";
import { Price } from "./Price";
import { Event } from "./Event";
import { TypePaymentable } from "./TypePaymentables";

@Entity('paymentable')
export class Paymentable {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @OneToMany(() => Price, price => price.paymentable, { orphanedRowAction: 'delete', cascade: ['insert', 'update'] })
  prices: Price[]

  @ManyToOne(() => Event, event => event.paymentables)
  event: Event

  @ManyToOne(() => TypePaymentable, tp => tp.paymentables)
  typePaymentable: TypePaymentable
}