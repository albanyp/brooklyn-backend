import { Entity, Column, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid' 

@Entity('user')
export class User {

  @PrimaryColumn({
    default: () => uuidv4()
  })
  // @Generated("uuid")
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    name: 'first_name'
  })
  firstName: string

  @Column({
    name: 'last_name'
  })
  lastName: string

  @Column()
  nickname: string

  @Column()
  birthdate: Date

  @Column({
    name: 'logo_url'
  })
  logoUrl: string

}
