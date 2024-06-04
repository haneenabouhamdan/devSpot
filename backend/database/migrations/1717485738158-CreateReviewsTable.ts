import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { reviewColumns } from '../columns';

export class CreateReviewsTable1717485738158 implements MigrationInterface {
  tableName = TableNames.reviews;
  referencedTableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, reviewColumns);
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
