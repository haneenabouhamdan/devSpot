import { useState } from 'react';
import { useGetUploadUrlQuery } from './getUploadUrl.service';
import { getExtensionValue, splitFileName, uploadFile } from './upload.helper';
import { UploadDirectory } from './upload.types';

interface FileUploadProps {
  directory: UploadDirectory;
}

interface FileUploadResult {
  filePath?: string;
  error?: string;
}

export function useFileUpload({ directory }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { getUploadUrl } = useGetUploadUrlQuery();

  const handleUpload = async (file: File): Promise<string> => {
    const { extension } = splitFileName(file.name);

    if (!extension) {
      throw new Error('Failed to extract file extension.');
    }

    const data = await getUploadUrl({
      fileType: getExtensionValue(extension),
      fileDirectory: directory,
    });

    if (!data) {
      throw new Error('Failed to get upload url');
    }

    try {
      await uploadFile(data.url, file);
      return data.filePath;
    } catch (e) {
      // TODO: handle error messages
      throw new Error('Failed to upload file');
    }
  };

  const upload = async (file: File): Promise<FileUploadResult> => {
    setLoading(true);
    try {
      const filePath = await handleUpload(file);
      setError(undefined);
      setLoading(false);
      return { filePath };
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'File upload failed';
      setError(error);
      setLoading(false);
      return { error };
    }
  };

  return {
    uploadFile: upload,
    loading,
    error,
  };
}
