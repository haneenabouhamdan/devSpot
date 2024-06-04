import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const userColumns: IColumn[] = [
  {
    name: 'username',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'password',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'phone_number',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'email',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'bio',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'job_title',
    type: ColumnTypes.varchar,
    isNullable: true,
  },
  {
    name: 'profile_picture',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    enum: DATABASE_ENUMS.userStatus,
    default: "'PENDING'",
    isNullable: false,
  },
  {
    name: 'date_of_birth',
    type: ColumnTypes.date,
    isNullable: true,
  },
  {
    name: 'is_notification_paused',
    type: ColumnTypes.boolean,
    default: false,
    isNullable: false,
  },
  {
    name: 'is_online',
    type: ColumnTypes.boolean,
    default: false,
    isNullable: false,
  },
];
