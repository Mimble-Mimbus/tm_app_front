import { format } from "@sqltools/formatter/lib/sqlFormatter";
import { DataSource } from "typeorm/browser";

export const migrationGenerate = {
  camelCase(str: string, firstCapital: boolean = false): string {
    if (firstCapital) str = " " + str;
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  },
  async handler(dataSource: DataSource, timestamp: number) {
    const filename = "migration" + timestamp;

    try {
      dataSource.setOptions({
        synchronize: false,
        migrationsRun: false,
        dropSchema: false,
        logging: false,
      });

      if (!dataSource.isInitialized) {
        dataSource.initialize();
      }

      const upSqls: string[] = [],
        downSqls: string[] = [];

      try {
        const sqlInMemory = await dataSource.driver.createSchemaBuilder().log();

        sqlInMemory.upQueries.forEach((upQuery) => {
          upSqls.push(
            "        await queryRunner.query(`" +
              upQuery.query.replace(new RegExp("`", "g"), "\\`") +
              "`" +
              this.queryParams(upQuery.parameters) +
              ");"
          );
        });
        sqlInMemory.downQueries.forEach((downQuery) => {
          downSqls.push(
            "        await queryRunner.query(`" +
              downQuery.query.replace(new RegExp("`", "g"), "\\`") +
              "`" +
              this.queryParams(downQuery.parameters) +
              ");"
          );
        });
      } finally {
        await dataSource.destroy();
      }

      if (!upSqls.length) {
        console.log(
          `No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command`
        );
      }

      const fileContent = this.getTemplate(
        filename,
        upSqls,
        downSqls.reverse()
      );

      console.log(`Migration ${filename} has been generated successfully.`);
      return fileContent;
    } catch (err) {
      console.error("Error during migration generation:", err);
    }
  },
  queryParams(parameters: any[] | undefined): string {
    if (!parameters || !parameters.length) {
      return "";
    }

    return `, ${JSON.stringify(parameters)}`;
  },
  getTemplate(name: string, upSqls: string[], downSqls: string[]): string {
    const migrationName = `${this.camelCase(name, true)}`;

    return `import { MigrationInterface, QueryRunner } from "typeorm/browser";

export class ${migrationName} implements MigrationInterface {
    name = '${migrationName}'

    public async up(queryRunner: QueryRunner): Promise<void> {
${upSqls.join(`
`)}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
${downSqls.join(`
`)}
    }

}
`;
  },
  getJavascriptTemplate(
    name: string,
    upSqls: string[],
    downSqls: string[]
  ): string {
    const migrationName = `${this.camelCase(name, true)}`;

    return `const { MigrationInterface, QueryRunner } = require("typeorm/browser");

module.exports = class ${migrationName} {
    name = '${migrationName}'

    async up(queryRunner) {
${upSqls.join(`
`)}
    }

    async down(queryRunner) {
${downSqls.join(`
`)}
    }
}
`;
  },
  prettifyQuery(query: string) {
    const formattedQuery = format(query, { indent: "    " });
    return "\n" + formattedQuery.replace(/^/gm, "            ") + "\n        ";
  },
};
