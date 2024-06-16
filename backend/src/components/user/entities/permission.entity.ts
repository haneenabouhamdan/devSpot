import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';
import { RolePermissions } from './rolePermission.entity';

@Entity('permissions')
export class Permission extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ default: false }) isRevoked: Boolean;

  @OneToMany(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.permission,
  )
  rolePermissions: RolePermissions[];
}
