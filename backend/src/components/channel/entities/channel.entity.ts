import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity('channels')
export class Channel extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isGroupChat: boolean;

  @Column({ nullable: false })
  createdBy: UUID;

  @Column({ nullable: true })
  photo: string;
}
