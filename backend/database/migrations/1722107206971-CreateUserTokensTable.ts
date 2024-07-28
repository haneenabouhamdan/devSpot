import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ColumnTypes } from '../type';
import { defaultTableConfig } from '../config';

export class CreateUserTokensTable1722107206971 implements MigrationInterface {
  private table = defaultTableConfig('user_tokens', [
    {
      name: 'token',
      type: ColumnTypes.varchar,
      isNullable: false,
    },
    {
      name: 'user_id',
      type: ColumnTypes.uuid,
      isNullable: false,
      isUnique: true,
    },
    {
      name: 'expires_at',
      type: ColumnTypes.timestamp,
      isNullable: true,
    },
  ]);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      'user_tokens',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_tokens');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('token', foreignKey ?? ' ');
    await queryRunner.dropTable('user_tokens');
  }
}
