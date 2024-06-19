import { registerEnumType } from '@nestjs/graphql';

export enum SubmissionStatus {
  CLOSED = 'closed',
  CREATED = 'created',
}

registerEnumType(SubmissionStatus, {
  name: 'SubmissionStatus',
});
