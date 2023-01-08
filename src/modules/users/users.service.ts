import { Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'
import { FindUsersDto } from './find-users.dto'
import { PAGE_SIZE } from '../../constants'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id: id })
    return user
  }

  async getUsers(@Query() params?: FindUsersDto) {
    // const page = params && params.pageNumber ? params.pageNumber : 1
    const page = params?.pageNumber || null
    const size = params?.pageSize || PAGE_SIZE

    if (page) {
      const queryBuilder = await this.userRepository
        .createQueryBuilder('user')
        .skip((page - 1) * size)
        .take(page * size)

        if(params.firstName) {
          queryBuilder.where('user.firstName ilike :firstName', { firstName: `%${params.firstName}%` })
        }

        if(params.lastName) {
          queryBuilder.andWhere('user.lastName ilike :lastName', { lastName: `%${params.lastName}%`})
        }

        if(params.email) {
          queryBuilder.andWhere('user.email ilike :email', { email: `%${params.email}%`})
        }

        if(params.nickname) {
          queryBuilder.andWhere('user.nickname ilike :nickname', { nickname: `%${params.nickname}%`})
        }

        const [users, total] = await queryBuilder.getManyAndCount()

      return {
        data: users,
        total
      }
    } else {
      const users = await this.userRepository.find()

      return {
        data: users,
        total: users.length
      }
    }
  }

  async updateUser(id: string, data: Object) {
    const user = await this.getUser(id)
    const newUser = user

    if (user) {
      const newUserData = Object.keys(data)

      newUserData.forEach(item => {
        if (data[item] !== user[item]) {
          newUser[item] = data[item]
        }
      })

      this.userRepository.save(newUser)
    }
  }

  async updateUserProperties(id: string, props: Object) {
    const userToBeUpdated = await this.getUser(id)

    if(userToBeUpdated) {
      const newUserData = Object.keys(props)
      const dataToUpdate = {}

      newUserData.forEach(item => {
        if (props[item] !== userToBeUpdated[item]) {
          dataToUpdate[item] = props[item]
        }
      })

      this.userRepository.update(id, dataToUpdate)
    }
  }

}