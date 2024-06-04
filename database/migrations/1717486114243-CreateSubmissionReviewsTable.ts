import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ColumnTypes, TableNames } from '../type';
import { defaultTableConfig } from '../config';

export class CreateSubmissionReviewsTable1717486114243
  implements MigrationInterface
{
  tableName = TableNames.submissionReviews;
  reviewsTable = TableNames.reviews;
  challengeSubmissionsTable = TableNames.challengeSubmissions;

  private table = defaultTableConfig(this.tableName, [
    {
      name: 'review_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
    {
      name: 'submission_id',
      type: ColumnTypes.uuid,
      isNullable: false,
    },
  ]);
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedTableName: this.reviewsTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['submission_id'],
        referencedTableName: this.challengeSubmissionsTable,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropForeignKey(this.tableName, 'submission_id'),
      queryRunner.dropForeignKey(this.tableName, 'review_id'),
      queryRunner.dropTable(this.tableName, true),
    ]);
  }
}
