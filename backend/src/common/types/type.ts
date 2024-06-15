import { EntityManager, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { FilterArgs } from '../dtos/filter.dto';
import { RequestMethods } from '../constants';

export type Optional<T> = T | undefined;

export interface EntityDTOConstructorOptions<DTO> {
  excludeFields?: Array<keyof DTO>;
}

export interface IEntityDTO {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IAbstractEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
}

export interface IMutationResponse<DTO> {
  message: string;
  data: DTO;
}

export interface PostgresDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface IDataLoader<Entity> {
  load(keys: any[]): Promise<Entity[]>;
}

export interface IOptions {
  transactionManager?: EntityManager;
  upsert?: boolean;
}

export interface TypeOrmFilter<T extends ObjectLiteral, F extends FilterArgs> {
  setQuery(query: SelectQueryBuilder<T>): TypeOrmFilter<T, F>;

  apply(filters: F): SelectQueryBuilder<T>;
}

export interface ITimeSlot {
  from: Time;
  to: Time;
}

export type EntityId = UUID | number | bigint;

export type WithRelation<
  T,
  K extends keyof T,
  NT = NonNullable<T[K]>,
> = Exclude<T, K> & { [P in K]-?: NonNullable<NT> };