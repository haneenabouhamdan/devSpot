import { useMutation } from '@apollo/client';
import { ACCEPT_INVITATION, IGNORE_INVITATION } from '../Queries';

interface InvitationInput {
  userId: string;
  channelId: string;
}

interface MutationResponse {
  message: string;
  success: boolean;
}

export const useAcceptInvitation = () => {
  const [acceptInvitation, { data, loading, error }] = useMutation<
    { acceptInvitation: MutationResponse },
    { invitationInput: InvitationInput }
  >(ACCEPT_INVITATION);

  return {
    acceptInvitation: (invitationInput: InvitationInput) =>
      acceptInvitation({ variables: { invitationInput } }),
    data,
    loading,
    error,
  };
};

// Hook to ignore an invitation
export const useIgnoreInvitation = () => {
  const [ignoreInvitation, { data, loading, error }] = useMutation<
    { ignoreInvitation: MutationResponse },
    { invitationInput: InvitationInput }
  >(IGNORE_INVITATION);

  return {
    ignoreInvitation: (invitationInput: InvitationInput) =>
      ignoreInvitation({ variables: { invitationInput } }),
    data,
    loading,
    error,
  };
};
