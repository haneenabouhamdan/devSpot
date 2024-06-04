import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { challengeColumns } from '../columns';

export class CreateChallengesTable1717483364778 implements MigrationInterface {
  tableName = TableNames.channels;
  referencedTableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, challengeColumns);
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
