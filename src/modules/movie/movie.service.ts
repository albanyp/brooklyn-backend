import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Logger } from '@nestjs/common'
import { Repository } from 'typeorm';
import { Movie } from '../../entity/movie';
import { MovieDto } from './dtos/movie.dto';
import { v4 as uuidv4 } from 'uuid'
import { FindMovieDto } from './dtos/find-movie.dto';
import { PAGE_SIZE } from '../../constants';
import { UpdateMovieDto } from './dtos/update-movie.dto';

export class MovieService {

  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) { }

  async getMovie(id: string) {
    const movie = await this.movieRepository.findOneBy({ id: id })
    return movie
  }

  async createMovie(movie: MovieDto): Promise<MovieDto> {
    try {
      const newMovie = this.movieRepository.create(movie)
      newMovie.id = uuidv4()
      newMovie.createdAt = new Date()
      newMovie.updatedAt = newMovie.createdAt

      if (movie.franchiseId && movie.franchiseId.length > 0) {
        newMovie.franchiseId = movie.franchiseId
      }
      await this.movieRepository.save(newMovie)
      return newMovie

    } catch {
      throw new BadRequestException()
    }
  }

  async getMovies(props: FindMovieDto) {
    const pageNumber = props.pageNumber ? props.pageNumber : 1
    const pageSize = props.pageSize ? props.pageSize : PAGE_SIZE
    const movieQueryBuilder = await this.movieRepository
      .createQueryBuilder('movie')

    if (props.title) {
      movieQueryBuilder.where('movie.title ilike :title', { title: `%${props.title}%` })
    }

    if (props.groupName) {
      movieQueryBuilder.andWhere('movie.groupName ilike :groupName', { groupName: `%${props.groupName}%` })
    }

    if (props.author) {
      movieQueryBuilder.andWhere('movie.author ilike :author', { author: `%${props.author}%` })
    }

    if (props.producer) {
      movieQueryBuilder.andWhere('movie.producer ilike :producer', { producer: `%${props.producer}%` })
    }

    if (pageNumber) {
      movieQueryBuilder
        .skip((pageNumber - 1) * pageSize)
        .take(pageNumber * pageSize)
    }

    const [movies, total] = await movieQueryBuilder.getManyAndCount()

    return {
      data: movies,
      total
    }
  }

  async updateMovie(id: string, propsToBeUpdated: FindMovieDto) {
    try {
      const movie = await this.getMovie(id)

      if (movie && propsToBeUpdated) {
        const movieProps = Object.keys(propsToBeUpdated)
        const changedProps = {}
        let newMovie = movie

        movieProps.forEach(movieProp => {
          if (propsToBeUpdated[movieProp] !== movie[movieProp]) {
            changedProps[movieProp] = propsToBeUpdated[movieProp]
            newMovie[movieProp] = propsToBeUpdated[movieProp]
          }
        })

        if (Object.keys(changedProps).length > 0) {
          await this.movieRepository.save(newMovie)
          return newMovie;
        }

      }
    } catch {
      throw new BadRequestException()
    }
  }

  async updateMovieProps(id: string, newProps: UpdateMovieDto) {
    try {
      const movie = await this.getMovie(id)

      if (movie && newProps) {
        const allowedProps = Object.keys(newProps)
        let moviePropsToBeUpdated = {}

        allowedProps.forEach(prop => {
          if (!movie[prop] || movie[prop] !== newProps[prop]) {
            moviePropsToBeUpdated[prop] = newProps[prop]
          }
        })

        if (Object.keys(moviePropsToBeUpdated).length > 0) {
          this.movieRepository.update(id, moviePropsToBeUpdated)
        }
      }
    } catch {
      throw new BadRequestException()
    }
  }

  async deleteMovie(id: string) {
    this.movieRepository.delete({ id: id })
  }

}