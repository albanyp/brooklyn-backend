import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addMovieTypeCreatedAtColumn1668287031906 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'movie_type',
			new TableColumn({
				name: 'created_at',
				type: 'date',
				isNullable: true
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('movie_type', 'created_at')
	}

}
