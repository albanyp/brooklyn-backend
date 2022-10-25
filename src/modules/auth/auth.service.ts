import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { CipherCCMTypes, CipherGCMTypes, CipherKey, createCipheriv, randomBytes, scrypt } from 'crypto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/User'
import { SignUpDto } from './dtos/sign-up.dto'
import { v4 as uuidv4 } from 'uuid'  
import { promisify } from 'util'
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
      Logger.log('user password: ', newUser.password)
      await this.userRepository.save(newUser)
      return newUser;
    } catch {
      // throw new Error('Sorry the user was not created. Bye')
      throw new BadRequestException()
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash

  }


}