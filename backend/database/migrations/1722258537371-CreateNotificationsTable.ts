import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { defaultTableConfig } from '../config';
import { ColumnTypes, DATABASE_ENUMS } from '../type';

export class CreateNotificationsTable1722258537371
  implements MigrationInterface
{
  private table = defaultTableConfig('notifications', [
    {
      name: 'token',
      type: ColumnTypes.varchar,
      isNullable: false,
    },
    {
      name: 'user_id',
      type: ColumnTypes.uuid,
      isNullable: true,
    },
    {
      name: 'channel_id',
      type: ColumnTypes.uuid,
      isNullable: true,
    },
    {
      name: 'challenge_id',
      type: ColumnTypes.uuid,
      isNullable: true,
    },
    {
      name: 'message_id',
      type: ColumnTypes.uuid,
      isNullable: true,
    },
    {
      name: 'status',
      type: ColumnTypes.enum,
      isNullable: false,
      enum: DATABASE_ENUMS.notificationStatus,
      default: "'PENDING'",
    },
    {
      name: 'text',
      type: ColumnTypes.text,
      isNullable: false,
    },
    {
      name: 'title',
      type: ColumnTypes.varchar,
      isNullable: false,
    },
  ]);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('notifications');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('notifications', foreignKey ?? ' ');
    await queryRunner.dropTable('notifications');
  }
}
