import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm/browser";
import { RpgActivity } from "./RpgActivity";

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column({ type: 'varchar' })
  name: string

  @OneToMany(() => RpgActivity, rpgActivity => rpgActivity.user)
  rpgActivities: RpgActivity[]
}
