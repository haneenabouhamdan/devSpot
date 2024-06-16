import { Column, Entity, OneToMany } from 'typeorm';
import { RolePermissions } from './rolePermission.entity';
import { AbstractEntity } from '../../../common/entities';
import { UserChannels } from '../../channel/entities/userChannels.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.role)
  rolePermissions: RolePermissions[];

  @OneToMany(() => UserChannels, (userChannels) => userChannels.role)
  userChannels: UserChannels[];
}
