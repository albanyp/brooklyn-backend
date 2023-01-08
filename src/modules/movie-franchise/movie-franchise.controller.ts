import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common'
import { FindMovieFranchiseDto } from './dtos/find-movie-franchise.dto'
import { MovieFranchiseDto } from './dtos/movie-franchise.dto'
import { MovieFranchiseService } from './movie-franchise.service'

@Controller('franchises')
export class MovieFranchiseController {
  constructor(private movieFranchiseService: MovieFranchiseService) {}

  @Get()
  async findFranchises(@Query() params?: FindMovieFranchiseDto) {
    return this.movieFranchiseService.getFranchises(params)
  }

  @Get(':id')
  async findFranchise(@Param() params) {
    return this.movieFranchiseService.getFranchise(params.id)
  }

  @Post('create')
  async addFranchise(@Body() movieFranchiseDto: MovieFranchiseDto) {
    return this.movieFranchiseService.createFranchise(movieFranchiseDto)
  }

  @Put('update/:id')
  async modifyFranchise(@Param() params, @Body() content) {
    this.movieFranchiseService.updateFranchise(params.id, content)
  }

  @Delete(':id')
  async removeFranchise(@Param() params) {
    return this.movieFranchiseService.deleteFranchise(params.id)
  }


}