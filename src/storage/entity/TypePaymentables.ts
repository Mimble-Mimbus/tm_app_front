import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm/browser";
import { Paymentable } from "./Paymentable";

@Entity('type_paymentable')
export class TypePaymentable {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @OneToMany(() => Paymentable, paymentable => paymentable.typePaymentable) 
  paymentables: Paymentable[]
}