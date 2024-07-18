import { registerEnumType } from '@nestjs/graphql';

export enum StorageActions {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  RESUMABLE = 'resumable',
}

export enum StorageVersions {
  V2 = 'v2',
  V4 = 'v4',
}

export enum FileTypes {
  'IMAGE_JPEG' = 'image/jpeg',
  'IMAGE_PNG' = 'image/png',
  'IMAGE_GIF' = 'image/gif',
  'APPLICATION_PDF' = 'application/pdf',
}

registerEnumType(FileTypes, {
  name: 'FileTypes',
});

export const mimeTypeToExtension = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
};

export enum FileDirectories {
  PROFILE_IMAGES = 'profile_images',
}

registerEnumType(FileDirectories, {
  name: 'FileDirectories',
});
