import { Column } from "typeorm";

export abstract class AZone {
  @Column({ type: 'varchar', length: 255})
  name: string
}