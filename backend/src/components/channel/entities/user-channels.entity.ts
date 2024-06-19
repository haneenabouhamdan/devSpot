import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role, User } from '../../user/entities';
import { AbstractEntity } from '../../../common/entities';
import { Channel } from './channel.entity';
import { UserChannelSubscriptionStatus } from '../enums';

@Entity('user_channels')
export class UserChannels extends AbstractEntity {
  @Column({ nullable: false })
  userId: UUID;

  @Column({ nullable: false })
  channelId: UUID;

  @Column({ nullable: false })
  roleId: UUID;

  @ManyToOne(() => Role, (role) => role.userChannels)
  role: Role;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @Column({
    type: 'enum',
    enum: UserChannelSubscriptionStatus,
    default: UserChannelSubscriptionStatus.ACTIVE,
  })
  status: UserChannelSubscriptionStatus;
}
