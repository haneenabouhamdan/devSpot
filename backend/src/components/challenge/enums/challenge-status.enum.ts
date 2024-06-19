import { registerEnumType } from '@nestjs/graphql';

export enum ChallengeStatus {
  created = 'CREATED',
  active = 'ACTIVE',
  completed = 'COMPLETED',
  cancelled = 'CANCELLED',
  failed = 'FAILED',
}
registerEnumType(ChallengeStatus, {
  name: 'ChallengeStatus',
});
