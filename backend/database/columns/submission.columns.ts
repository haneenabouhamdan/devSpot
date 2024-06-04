import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const submissionsColumns: IColumn[] = [
  {
    name: 'submission_text',
    type: ColumnTypes.text,
    isNullable: false,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    isNullable: false,
    default: "'PENDING'",
    enum: DATABASE_ENUMS.submissionStatus,
  },
  {
    name: 'challenge_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'created_by',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
];
