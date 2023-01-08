import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createMovieTypeTable1667443621640 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'movie_type',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'name',
						type: 'varchar(64)',
						isUnique: true
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('movie_type')
	}

}
