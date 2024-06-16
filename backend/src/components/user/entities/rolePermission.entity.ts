import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { AbstractEntity } from 'src/common/entities';

@Entity('role_permissions')
export class RolePermissions extends AbstractEntity {
  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;
}
