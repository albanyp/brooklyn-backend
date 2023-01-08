import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class createMovieTable1667445278513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movie',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'title',
                        type: 'varchar(256)',
                        isNullable: false
                    },
                    {
                        name: 'release_date',
                        type: 'date',
                        isNullable: true
                    },
                    {
                        name: 'group_name',
                        type: 'varchar(128)',
                        isNullable: true
                    },
                    {
                        name: 'position',
                        type: 'int',
                        isNullable: false,
                        default: 1
                    }, 
                    {
                        name: 'author',
                        type: 'varchar(128)',
                        isNullable: true
                    },
                    {
                        name: 'producer',
                        type: 'varchar(128)',
                        isNullable: true
                    },
                    {
                        name: 'logo_url',
                        type: 'text',
                        isNullable: true
                    },
                ]
            })
        )

        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'movie_type_id',
                type: 'uuid'
            })
        )

        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'movie_franchise_id',
                type: 'uuid'
            })
        )

        await queryRunner.createForeignKey(
            'movie',
            new TableForeignKey({
                columnNames: ['movie_type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'movie_type',
                onDelete: 'SET NULL'
            })
        )

        await queryRunner.createForeignKey(
            'movie',
            new TableForeignKey({
                columnNames: ['movie_franchise_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'movie_franchise',
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie')
    }

}
