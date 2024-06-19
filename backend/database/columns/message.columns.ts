import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const messageColumns: IColumn[] = [
  {
    name: 'text',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    isNullable: false,
    default: "'PENDING'",
    enum: DATABASE_ENUMS.messageStatus,
  },
  {
    name: 'attachments',
    type: ColumnTypes.text,
    isNullable: true,
    isArray: true,
  },

  {
    name: 'sender_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'channel_id',
    type: ColumnTypes.uuid,
    isNullable: true,
  },
  {
    name: 'parent_message_id',
    type: ColumnTypes.uuid,
    isNullable: true,
  },
];
