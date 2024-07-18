import { useLazyQuery } from '@apollo/client';
import { GET_SIGNED_UPLOAD_URL } from './upload.graphql';
import { GetUploadUrlVariables } from './upload.types';

interface QueryResponse {
  signedUploadUrl: {
    filePath: string;
    url: string;
  };
}

export function useGetUploadUrlQuery() {
  const [query, { data, loading, error }] = useLazyQuery<QueryResponse>(
    GET_SIGNED_UPLOAD_URL,
    {
      fetchPolicy: 'no-cache',
    }
  );

  async function getUploadUrl(vars: GetUploadUrlVariables) {
    const { data } = await query({
      variables: {
        fileType: vars.fileType,
        fileDirectory: vars.fileDirectory,
      },
    });
    return data?.signedUploadUrl;
  }

  return {
    getUploadUrl,
    uploadURL: data?.signedUploadUrl,
    loading,
    error,
  };
}
