import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLUUID,
} from 'graphql-scalars';
import { ExcludeMethods } from '../../common/types';

@ObjectType()
export class AuthUserDto {
  @Field(() => GraphQLUUID)
  id: UUID;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  email?: string | null;

  @Field(() => GraphQLDateTime, { nullable: true })
  phoneVerifiedAt?: Date;

  @Field(() => GraphQLDateTime, { nullable: true })
  emailVerifiedAt?: Date;

  @Field(() => [GraphQLString])
  roles: string[];

  @Field(() => [GraphQLString])
  permissions: string[];

  constructor(props: ExcludeMethods<AuthUserDto>) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.roles = props.roles;
    this.permissions = props.permissions;
    this.phoneVerifiedAt = props.phoneVerifiedAt;
    this.emailVerifiedAt = props.emailVerifiedAt;
  }

  hasAnyRole(...roles: string[]): boolean {
    return this.roles.some((role) => roles.includes(role));
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  //   isAdmin(): boolean {
  //     return this.hasAnyRole(DefaultRoles.SUPERADMIN, DefaultRoles.ADMIN);
  //   }

  //   isSuperAdmin(): boolean {
  //     return this.hasRole(DefaultRoles.SUPERADMIN);
  //   }

  can(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  cant(permission: string): boolean {
    return !this.permissions.includes(permission);
  }
}
