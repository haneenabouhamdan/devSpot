import { ColumnTypes, IColumn } from '../type';

export const channelColumns: IColumn[] = [
  {
    name: 'name',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'description',
    type: ColumnTypes.varchar,
    isNullable: true,
  },
  {
    name: 'is_private',
    type: ColumnTypes.boolean,
    default: false,
    isNullable: false,
  },
  {
    name: 'is_group_chat',
    type: ColumnTypes.boolean,
    default: true,
    isNullable: false,
  },
  {
    name: 'photo',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'created_by',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
];
