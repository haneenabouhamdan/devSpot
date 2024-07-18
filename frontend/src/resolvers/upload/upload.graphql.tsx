import { gql } from '@apollo/client';

export const GET_SIGNED_UPLOAD_URL = gql`
  query SignedUploadUrl(
    $fileType: FileTypes!
    $fileDirectory: FileDirectories!
  ) {
    signedUploadUrl(fileType: $fileType, fileDirectory: $fileDirectory) {
      filePath
      url
    }
  }
`;
