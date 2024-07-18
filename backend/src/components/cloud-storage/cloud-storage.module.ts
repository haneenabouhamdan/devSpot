import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';
import { CloudStorageResolver } from './cloud-storage.resolver';

@Module({
  providers: [CloudStorageService, CloudStorageResolver],
})
export class CloudStorageModule {}
