import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { channelColumns } from '../columns';

export class CreateChannelsTable1717445737258 implements MigrationInterface {
  tableName = TableNames.channels;
  referencedTableName = TableNames.users;
  private table = defaultTableConfig(this.tableName, channelColumns);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
