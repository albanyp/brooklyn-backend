import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Logger, Query } from '@nestjs/common'
import { FindMovieDto } from './dtos/find-movie.dto'
import { MovieDto } from './dtos/movie.dto'
import { UpdateMovieDto } from './dtos/update-movie.dto'
import { MovieService } from './movie.service'

@Controller('movies')

export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':id')
  async findMovie(@Param() movieId: { id: string }) {
    return this.movieService.getMovie(movieId.id)
  }

  @Get()
  async findMovies(@Query() props?: FindMovieDto) {
    return this.movieService.getMovies(props)
  }

  @Post('create')
  async addMovie(@Body() movieProps: MovieDto) {
    return this.movieService.createMovie(movieProps)
  }

  @Put('update/:id')
  async modifyMovie(@Param() id, @Body() props: FindMovieDto) {
    return this.movieService.updateMovie(id.id, props)
  }

  @Patch('update/:id')
  async changeMovie(@Param() movieId, @Body() props: UpdateMovieDto) {
    this.movieService.updateMovieProps(movieId.id, props)
  }

  @Delete(':id')
  async removeMovie(@Param() movieId: { id: string }) {
    return this.movieService.deleteMovie(movieId.id)
  }
}