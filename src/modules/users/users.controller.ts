import { Controller, Get, Patch, Put, Param, Query, Body } from '@nestjs/common'
import { User } from '../../entity/user';
import { FindUsersDto } from './find-users.dto';
import { UsersService } from './users.service';

Param

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUser(@Param() params) {
    return this.usersService.getUser(params.id)
  } 

  @Get() 
  async findUsers(@Query() params?: FindUsersDto) {
    return this.usersService.getUsers(params)
  }

  @Put(':id')
  async modifyUser(@Param() userId, @Body() data) {
    this.usersService.updateUser(userId.id, data)
  }

  @Patch(':id')
  async modifyUserProperties(@Param() userId, @Body() props) {
    this.usersService.updateUserProperties(userId.id, props)
  }

}