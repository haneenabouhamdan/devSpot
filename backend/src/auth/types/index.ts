import { registerEnumType } from '@nestjs/graphql';

export enum AuthResultType {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
}

registerEnumType(AuthResultType, {
  name: 'AuthResultType',
});

export interface AuthIdentifierType {
  identifier: string;
}
