import React, { useState, useRef } from 'react';
import { Avatar, Box } from '@chakra-ui/react';
import {
  GetUploadUrlVariables,
  UploadDirectory,
  getExtensionValue,
  splitFileName,
  useGetUploadUrlQuery,
} from '../../resolvers/upload';

interface AvatarUploaderProps {
  onUploadComplete?: (fileUrl: string) => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUploadComplete,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { getUploadUrl } = useGetUploadUrlQuery();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    const { extension: fileExtension } = splitFileName(file.name);
    if (!fileExtension) {
      return;
    }

    const fileUploadArgs: GetUploadUrlVariables = {
      fileType: getExtensionValue(fileExtension),
      fileDirectory: UploadDirectory.PROFILE_IMAGES,
    };

    const fileUploaded = await getUploadUrl(fileUploadArgs);

    if (!fileUploaded || !onUploadComplete) return;

    onUploadComplete(fileUploaded?.url);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Avatar
        size="xl"
        src={avatarUrl || 'https://bit.ly/broken-link'}
        cursor="pointer"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleUpload}
        />
      </Avatar>
    </Box>
  );
};
