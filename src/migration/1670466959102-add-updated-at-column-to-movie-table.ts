import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addUpdatedAtColumnToMovieTable1670466959102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'updated_at',
                type: 'date',
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('movie', 'updated_at')
    }

}
