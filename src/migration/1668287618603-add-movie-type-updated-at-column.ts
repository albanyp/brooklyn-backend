import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addMovieTypeUpdatedAtColumn1668287618603 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'movie_type',
			new TableColumn({
				name: 'updated_at',
				type: 'date',
				isNullable: true
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('movie_type', 'updated_at')
	}

}
