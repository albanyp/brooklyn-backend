import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addCreatedAtColumnToMovieTable1670466933707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'created_at',
                type: 'date',
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('movie', 'created_at')
    }

}
