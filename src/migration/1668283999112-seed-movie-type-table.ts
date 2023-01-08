import { MigrationInterface, QueryRunner } from "typeorm"
import { MovieType } from "../entity/movie-type"
import { v4 as uuidv4 } from 'uuid'

export class seedMovieTypeTable1668283999112 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.save(
			queryRunner.manager.create<MovieType>(MovieType, {
				id: uuidv4(),
				name: 'movie'
			})
		)

		await queryRunner.manager.save(
			queryRunner.manager.create<MovieType>(MovieType, {
				id: uuidv4(),
				name: 'series'
			})
		)

		await queryRunner.manager.save(
			queryRunner.manager.create<MovieType>(MovieType, {
				id: uuidv4(),
				name: 'anime'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE * FROM movie_type`)
	}

}
