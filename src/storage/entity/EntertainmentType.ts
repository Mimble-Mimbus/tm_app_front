import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Entertainment } from "./Entertainment";

@Entity('entertainment_type')
export class EntertainmentType {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @OneToMany(() => Entertainment ,entertainment => entertainment.entertainmentType)
  entertainments: Entertainment[]
}