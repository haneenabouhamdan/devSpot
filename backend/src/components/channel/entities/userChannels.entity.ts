import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Channel } from './channel.entity';
import { Role } from '../../user/entities';
import { AbstractEntity } from '../../../common/entities';

@Entity('user_channels')
export class UserChannels extends AbstractEntity {
  @Column({ nullable: false })
  userId: UUID;

  @Column({ nullable: false })
  channelId: UUID;

  @ManyToOne(() => Role, (role) => role.userChannels)
  role: Role;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  })
  status: string;
}
