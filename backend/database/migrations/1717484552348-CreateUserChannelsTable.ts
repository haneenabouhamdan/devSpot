import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ColumnTypes, DATABASE_ENUMS, TableNames } from '../type';
import { defaultTableConfig } from '../config';

export class CreateUserChannelsTable1717484552348
  implements MigrationInterface
{
  tableName = TableNames.userChannels;
  usersTable = TableNames.users;
  channelsTable = TableNames.channels;
  rolesTable = TableNames.roles;

  private table = defaultTableConfig(this.tableName, [
    {
      name: 'status',
      type: ColumnTypes.enum,
      default: "'PENDING'",
      isNullable: false,
      enum: DATABASE_ENUMS.userStatus,
    },
    {
      name: 'role_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
    {
      name: 'channel_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
    {
      name: 'user_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
  ]);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedTableName: this.rolesTable,
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
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: this.usersTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(this.tableName, 'role_id'),
      queryRunner.dropForeignKey(this.tableName, 'channel_id'),
      queryRunner.dropForeignKey(this.tableName, 'user_id'),
      queryRunner.dropTable(this.tableName, true),
    ]);
  }
}
