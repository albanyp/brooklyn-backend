import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieType } from '../../entity/movie-type';

@Injectable()
export class MovieTypeService {
  constructor(@InjectRepository(MovieType) private movieRepository: Repository<MovieType>) {}

  
}