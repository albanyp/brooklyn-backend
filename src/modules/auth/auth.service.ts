import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'
import { SignUpDto } from './dtos/sign-up.dto'
import { v4 as uuidv4 } from 'uuid'  
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  findAll(): string {
    return 'hello world service'
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpDto> {
    try {
      const newUser = this.userRepository.create(signUpDto)
      newUser.id = uuidv4()
      newUser.password = await this.encryptPassword(newUser.password)
      await this.userRepository.save(newUser)
      return newUser;
    } catch {
      throw new BadRequestException()
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash
  }


}