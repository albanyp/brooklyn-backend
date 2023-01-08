import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createUserTable1666056104940 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'email',
            type: 'varchar(128)',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar(512)',
            isNullable: false
          },
          {
            name: 'first_name',
            type: 'varchar(32)',
            isNullable: false
          },
          {
            name: 'last_name',
            type: 'varchar(32)',
            isNullable: false
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: true
          },
          {
            name: 'logo_url',
            type: 'text',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }

}
