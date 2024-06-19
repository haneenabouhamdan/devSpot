import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateChannelDto {
  @IsString()
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isGroupChat?: boolean;

  @Field()
  @IsUUID()
  createdBy: UUID;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  photo?: string;
}
