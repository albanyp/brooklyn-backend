import { MigrationInterface, QueryRunner, TableUnique } from "typeorm"

export class AddEmailUniqueConstraint1666411319092 implements MigrationInterface {
  tableConstraint = new TableUnique({
    name: 'user_email_constraint',
    columnNames: ['email']
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint('user', this.tableConstraint)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('user', this.tableConstraint)
  }

}
