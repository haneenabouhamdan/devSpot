import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';
import { UserChannels } from '../../channel/entities/user-channels.entity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @OneToMany(() => UserChannels, (userChannels) => userChannels.role)
  userChannels: UserChannels[];
}
