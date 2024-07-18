import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileDirectories, FileTypes } from './storage.types';

@ArgsType()
export class CloudStorageUploadArgs {
  @IsNotEmpty()
  @IsEnum(FileTypes)
  @Field(() => FileTypes)
  fileType: FileTypes;

  @IsString()
  @IsNotEmpty()
  @Field(() => FileDirectories)
  fileDirectory: FileDirectories;
}

@ArgsType()
export class CloudStorageReadArgs {
  @IsString()
  @IsNotEmpty()
  @Field()
  filePath: string;
}

@ObjectType()
export class SignedUrlResponse {
  @Field(() => String, { nullable: true })
  filePath?: string;

  @Field(() => String, { nullable: true })
  url?: string;
}
