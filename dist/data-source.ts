import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: 'postgres',
  username: 'postgres',
  password: 'masterkey',
  database: 'brooklyn',
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ["./migrations/*{.ts,.js}"]
})