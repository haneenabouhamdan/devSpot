import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { GraphQLString } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { AccountStatus } from '../enums';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @Field(() => GraphQLEmailAddress)
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(9)
  @MaxLength(20)
  phoneNumber: string;

  @Field()
  @IsString()
  @MinLength(8)
  password: string;

  @Field(() => [GraphQLString], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @Field(() => [GraphQLString], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @Field(() => AccountStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status?: AccountStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  notificationPaused?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;
}
