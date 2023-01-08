import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class Movie {
  @PrimaryColumn({
    default: () => uuidv4()
  })
  id: string

  @Column()
  title: string

  @Column({
    name: 'release_date',
    nullable: true
  })
  releaseDate: Date

  @Column({
    name: 'group_name',
    nullable: true
  })
  groupName: string

  @Column()
  position: number

  @Column({
    nullable: true
  })
  author: string

  @Column({
    nullable: true
  })
  producer: string

  @Column({
    name: 'logo_url',
    nullable: true
  })
  logoUrl: string

  @Column({
    name: 'movie_franchise_id',
    nullable: true
  })
  franchiseId: string

  @Column({
    name: 'movie_type_id',
    nullable: false
  })
  typeId: string

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