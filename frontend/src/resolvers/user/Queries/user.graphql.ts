import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserDto: UpdateUserDto!) {
    updateUser(UpdateUserDto: $updateUserDto) {
      status
      id
    }
  }
`;
