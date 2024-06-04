import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { userColumns } from '../columns';

export class CreateUsersTable1717015002766 implements MigrationInterface {
  tableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, userColumns);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true);
  }
}
