import { Column, Entity, PrimaryColumn } from 'typeorm'
import {v4 as uuid } from 'uuid'

@Entity('movie_franchise')
export class MovieFranchise {
  @PrimaryColumn({
    default: () => uuid
  })
  id: string

  @Column()
  name: string

  @Column({
    name: 'created_at',
    nullable: true
  })
  createdAt: Date

  @Column({
    name: 'updated_at',
    nullable: true
  })
  updatedAt: Date
}