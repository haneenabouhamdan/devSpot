import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ColumnTypes, TableNames } from '../type';
import { defaultTableConfig } from '../config';

export class CreateRolePermissionTable1717483979525
  implements MigrationInterface
{
  tableName = TableNames.rolePermissions;
  rolesTable = TableNames.roles;
  permissionsTable = TableNames.permissions;
  private table = defaultTableConfig(this.tableName, [
    {
      name: 'role_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
    {
      name: 'permission_id',
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
        columnNames: ['permission_id'],
        referencedTableName: this.permissionsTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(this.tableName, 'role_id'),
      queryRunner.dropForeignKey(this.tableName, 'permission_id'),
      queryRunner.dropTable(this.tableName, true),
    ]);
  }
}
