import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ default: false }) isRevoked: Boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
