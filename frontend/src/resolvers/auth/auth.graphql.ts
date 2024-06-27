import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      token
      user {
        email
        dateOfBirth
        status
        username
        profilePicture
        phoneNumber
        notificationPaused
        jobTitle
        id
        createdAt
        bio
      }
    }
  }
`;

export const REGISTER = gql`
  mutation RegisterRetailer($registerInput: RegisterRetailerInput!) {
    registerRetailer(registerInput: $registerInput) {
      token
      user {
        id
        name
        phone
        email
      }
    }
  }
`;
export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
      phoneNumber
      status
      bio
      jobTitle
      dateOfBirth
      notificationPaused
      profilePicture
      roles
      permissions
    }
  }
`;
