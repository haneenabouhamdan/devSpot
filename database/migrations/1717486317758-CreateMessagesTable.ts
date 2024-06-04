import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { TableNames } from '../type';
import { defaultTableConfig } from '../config';
import { messageColumns } from '../columns';

export class CreateMessagesTable1717486317758 implements MigrationInterface {
  tableName = TableNames.messages;
  usersTable = TableNames.users;
  channelsTable = TableNames.channels;

  private table = defaultTableConfig(this.tableName, messageColumns);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedTableName: this.usersTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['channel_id'],
        referencedTableName: this.channelsTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(this.tableName, 'channel_id'),
      queryRunner.dropForeignKey(this.tableName, 'sender_id'),
      queryRunner.dropTable(this.tableName, true),
    ]);
  }
}
