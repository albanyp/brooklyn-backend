import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieFranchise } from '../../entity/movie-franchise';
import { UpdateMovieFranchiseDto } from './dtos/update-movie-franchise.dto';
import { v4 as uuidv4 } from 'uuid'
import { FindMovieFranchiseParamsDto } from './dtos/find-movie-franchise-params.dto';
import { PAGE_SIZE } from '../../constants';
import { PaginationResponse } from '../../helpers/pagination-response';

@Injectable()
export class MovieFranchiseService {
  constructor(@InjectRepository(MovieFranchise) private movieFranchiseRepository: Repository<MovieFranchise>) { }

  async findFranchises(params?: FindMovieFranchiseParamsDto): Promise<PaginationResponse<MovieFranchise>> {
    const page = params && params.pageNumber ? params.pageNumber : null
    const size = params && params.pageSize ? params.pageSize : PAGE_SIZE
    const name = params && params.name ? params.name : null

    if (page) {
      const queryBuilder = await this.movieFranchiseRepository
        .createQueryBuilder('movieFranchise')
        .skip((page - 1) * size)
        .take(size * page)

      if (name) {
        queryBuilder.where('movieFranchise.name ilike :franchiseName', { franchiseName: `%${name}%` })
      }

      const [franchise, total] = await queryBuilder.getManyAndCount()

      return {
        data: franchise,
        total
      }
    } else {
      const franchises = await this.movieFranchiseRepository.find()

      return {
        data: franchises,
        total: franchises.length
      }
    }

  }

  async findFranchiseById(param: string): Promise<MovieFranchise> {
    const franchise = await this.movieFranchiseRepository.findOneBy({ id: param })
    return franchise
  }

  async createFranchise(movieFranchise: MovieFranchise): Promise<MovieFranchise> {
    try {
      const newMovieFranchise = this.movieFranchiseRepository.create(movieFranchise)
      newMovieFranchise.id = uuidv4()

      await this.movieFranchiseRepository.save(newMovieFranchise)
      return newMovieFranchise
    } catch {
      throw new BadRequestException()
    }
  }

  async updateFranchise(id: string, dto: UpdateMovieFranchiseDto): Promise<MovieFranchise>{
    if (dto && dto.name) {
      const franchiseToBeUpdated = await this.findFranchiseById(id)

      if (franchiseToBeUpdated && franchiseToBeUpdated.name !== dto.name) {
        const contentToBeUpdated = franchiseToBeUpdated
        contentToBeUpdated.name = dto.name
        this.movieFranchiseRepository.update(id,contentToBeUpdated)

        return contentToBeUpdated
      } else {
        throw new BadRequestException(`Franchise can't be updated`)
      }
    }
  }

  async deleteFranchise(id: string) {
    this.movieFranchiseRepository.delete(id)
  }
}