import { gql } from '@apollo/client';




export const PASSWORD_LOGIN = gql`
 
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
      retailer {
        id
        name
        status
      }
    }
  }
`;


