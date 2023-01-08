import { MigrationInterface, QueryRunner } from "typeorm"

export class removeNotNullConstraintFranchiseIdMovieTable1670518314198 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "movie" ALTER COLUMN "movie_franchise_id" DROP NOT NULL'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "movie" ALTER COLUMN "movie_franchise_id" SET NOT NULL'
    )
  }

}
