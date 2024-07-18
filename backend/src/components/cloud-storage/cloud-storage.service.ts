import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { createReadStream } from 'fs';
import { CloudStorageUploadArgs } from './storage.dtos';
import { mimeTypeToExtension } from './storage.types';
import { getUUID } from 'src/common/utilities';
import { bucket } from 'src/firebase-admin';
@Injectable()
export class CloudStorageService {
  async generateUploadSignedUrl(
    args: CloudStorageUploadArgs,
  ): Promise<{ url: string; filePath: string }> {
    const { fileDirectory, fileType } = args;

    const uniqueFileName = getUUID().toLowerCase();
    const filePath = `${fileDirectory}/${uniqueFileName}.${mimeTypeToExtension[fileType]}`;
    const destination = `${fileDirectory}/${Date.now()}-${uniqueFileName}.${mimeTypeToExtension[fileType]}`;

    const fileStream = createReadStream(filePath);
    const remoteFile = bucket.file(destination); // Use the bucket instance
    const writeStream = remoteFile.createWriteStream({
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(writeStream)
        .on('finish', async () => {
          try {
            const [url] = await remoteFile.getSignedUrl({
              action: 'read',
              expires: '03-09-2491', // Choose an expiration date far in the future
            });
            resolve({ url, filePath: destination });
          } catch (error) {
            reject(
              new InternalServerErrorException(
                'File upload failed',
                error.message,
              ),
            );
          }
        })
        .on('error', (error) => {
          reject(
            new InternalServerErrorException(
              'File upload failed',
              error.message,
            ),
          );
        });
    });
  }
}
