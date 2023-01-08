import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addUserTableNicknameColumn1668992151943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'nickname',
                type: 'varchar(32)',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'nickname')
    }

}
