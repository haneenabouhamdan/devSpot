export enum TableNames {
  users = 'users',
  messages = 'messages',
  messageReactions = 'message_reactions',
  pinnedMessages = 'pinned_messages',
  channels = 'channels',
  userChannels = 'user_channels',
  challenges = 'challenges',
  challengeSubmissions = 'challenge_submissions',
  submissionReviews = 'submission_reviews',
  reviews = 'reviews',
  roles = 'roles',
  permissions = 'permissions',
  rolePermissions = 'role_permissions',
}

export enum ColumnTypes {
  boolean = 'boolean',
  varchar = 'varchar',
  text = 'text',
  uuid = 'uuid',
  json = 'json',
  timestamp = 'timestamp',
  date = 'date',
  time = 'time',
  float = 'float8',
  int = 'int8',
  enum = 'enum',
  smallint = 'int2',
  decimal = 'decimal',
}

export interface IColumn {
  name: string;
  type: string;
  length?: string;
  isUnique?: boolean;
  isPrimary?: boolean;
  enum?: string[];
  default?: any;
  isNullable: boolean;
  isArray?: boolean;
}

export const DATABASE_ENUMS_NAMES = Object.freeze({
  roles: 'roles_enum',
  userStatus: 'user_status_enum',
  messageStatus: 'message_status_enum',
  challengeStatus: 'challenge_status_enum',
  submissionStatus: 'submission_status_enum',
  difficultyLevel: 'difficulty_level_enum',
});

export const DATABASE_ENUMS = Object.freeze({
  roles: ['SuperAdmin', 'Admin', 'Mentor', 'Developer'],
  userStatus: ['PENDING', 'ACTIVE', 'INACTIVE'],
  messageStatus: ['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
  challengeStatus: ['CREATED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'FAILED'],
  submissionStatus: [
    'PENDING',
    'SUBMITTED',
    'UNDER_REVIEW',
    'ACCEPTED',
    'REJECTED',
  ],
  difficultyLevel: ['EASY', 'MEDIUM', 'HARD'],
});
