import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const challengeColumns: IColumn[] = [
  {
    name: 'title',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'description',
    type: ColumnTypes.varchar,
    isNullable: true,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    isNullable: false,
    default: "'CREATED'",
    enum: DATABASE_ENUMS.challengeStatus,
  },
  {
    name: 'created_by',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'difficulty_level',
    type: ColumnTypes.enum,
    isNullable: false,
    enum: DATABASE_ENUMS.difficultyLevel,
  },
];
