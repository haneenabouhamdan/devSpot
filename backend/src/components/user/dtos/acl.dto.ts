import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IsOptional,
  IsInt,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { FilterArgs } from 'src/common/dtos';
import { PermissionDto, RoleDto } from './user.dto';

@ArgsType()
export class RoleFilterArgs extends FilterArgs {
  @IsOptional()
  @IsInt({ each: true })
  @Field(() => [Int], { nullable: true })
  id?: number[];

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  name?: string[];

  @IsOptional()
  @IsUUID()
  @Field(() => GraphQLUUID, { nullable: true })
  userId?: UUID;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  withPermissions?: boolean;
}

@ObjectType()
export class ChannelRolePermissionsDto {
  @Field()
  channelId: string;

  @Field(() => RoleDto)
  role: RoleDto;

  @Field(() => [PermissionDto])
  permissions: PermissionDto[];
}
