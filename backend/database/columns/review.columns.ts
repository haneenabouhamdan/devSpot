import { ColumnTypes, IColumn } from '../type';

export const reviewColumns: IColumn[] = [
  {
    name: 'comment',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'created_by',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'score',
    type: ColumnTypes.int,
    isNullable: false,
  },
];
