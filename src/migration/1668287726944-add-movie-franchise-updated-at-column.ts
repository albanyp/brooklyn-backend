import { query } from "express"
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addMovieFranchiseUpdatedAtColumn1668287726944 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'movie_franchise',
			new TableColumn({
				name: 'updated_at',
				type: 'date',
				isNullable: true
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('movie_franchise', 'updated_at')
	}

}
