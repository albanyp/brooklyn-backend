import { IsNull, MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addMovieFranchiseCreatedAtColumn1668287888840 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'movie_franchise',
			new TableColumn({
				name: 'created_at',
				type: 'date',
				isNullable: true
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('movie_franchise', 'created_at')
	}

}
