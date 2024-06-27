import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { AccountStatus } from '../enums';
import { GraphQLEmailAddress, GraphQLUUID } from 'graphql-scalars';
import { EntityDTO, FilterArgs } from '../../../common/dtos';
import {
  IsOptional,
  IsEmail,
  IsString,
  IsEnum,
  IsArray,
} from 'class-validator';

@ObjectType()
export class UserDto extends EntityDTO {
  @Field()
  username: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  email?: string;

  @Field()
  phoneNumber: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  jobTitle: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field(() => Boolean, { nullable: true })
  notificationPaused: Boolean;

  @Field(() => String, { nullable: true })
  profilePicture: string;
}

@ArgsType()
export class UserFilterArgs extends FilterArgs {
  @IsOptional()
  @IsEmail()
  @Field(() => GraphQLEmailAddress, { nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsString()
  @IsEnum(AccountStatus)
  @IsOptional()
  @Field(() => AccountStatus, { nullable: true })
  status?: AccountStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  roles?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  permissions?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  excludeRoles?: string[];
}

@ObjectType()
export class PermissionDto extends EntityDTO {
  @Field()
  name: string;

  @Field()
  isRevoked: boolean;
}

@ObjectType()
export class RoleDto extends EntityDTO {
  @Field()
  name: string;

  @Field(() => [PermissionDto])
  permissions: PermissionDto[];
}
