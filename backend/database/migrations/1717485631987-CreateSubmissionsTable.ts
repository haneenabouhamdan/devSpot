import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { submissionsColumns } from '../columns';

export class CreateSubmissionsTable1717485631987 implements MigrationInterface {
  tableName = TableNames.challengeSubmissions;
  referencedTableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, submissionsColumns);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedTableName: this.referencedTableName,
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'created_by');
    await queryRunner.dropTable(this.tableName, true);
  }
}
