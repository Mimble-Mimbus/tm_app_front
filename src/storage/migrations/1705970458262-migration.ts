import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1705970458262 implements MigrationInterface {
    name = "Migration1705970458262"
    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`CREATE TABLE IF NOT EXISTS "Ticket" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "username" varchar NOT NULL,
        "email" varchar NOT NULL,
        "data" varchar NOT NULL
      );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query('DROP table "Ticket";')
    }

}
