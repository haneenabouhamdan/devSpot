import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ColumnTypes, TableNames } from '../type';
import { defaultTableConfig } from '../config';

export class CreatePinnedMessageTable1717486874165
  implements MigrationInterface
{
  tableName = TableNames.pinnedMessages;
  messagesTable = TableNames.messages;
  usersTable = TableNames.users;

  private table = defaultTableConfig(this.tableName, [
    {
      name: 'user_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
    {
      name: 'message_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
  ]);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: this.usersTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['message_id'],
        referencedTableName: this.messagesTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(this.tableName, 'user_id'),
      queryRunner.dropForeignKey(this.tableName, 'message_id'),
      queryRunner.dropTable(this.tableName, true),
    ]);
  }
}
