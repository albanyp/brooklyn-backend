import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { LogInReqDto } from './dtos/log-in-req.dto'
import { LogInResDto } from './dtos/log-in-res.dto'
import { User } from '../../entity/user'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  findAll(): string {
    return this.authService.findAll()
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto)
  }

  @Post('login')
  async login(@Body() LogInDto: LogInReqDto): Promise<LogInResDto> {
    return this.authService.login(LogInDto)
  }
}
