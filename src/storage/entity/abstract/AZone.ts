import { Column } from "typeorm/browser";

export abstract class AZone {
  @Column({ type: 'varchar', length: 255})
  name: string
}