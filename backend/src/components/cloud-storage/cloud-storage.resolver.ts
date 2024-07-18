import { Args, Query, Resolver } from '@nestjs/graphql';
import { CloudStorageService } from './cloud-storage.service';
import { CloudStorageUploadArgs, SignedUrlResponse } from './storage.dtos';
import { SkipAuth } from '../../common/decorators';

@Resolver()
export class CloudStorageResolver {
  constructor(private readonly cloudStorageService: CloudStorageService) {}

  @SkipAuth()
  @Query(() => SignedUrlResponse)
  async signedUploadUrl(@Args() args: CloudStorageUploadArgs) {
    return this.cloudStorageService.generateUploadSignedUrl(args);
  }
}
