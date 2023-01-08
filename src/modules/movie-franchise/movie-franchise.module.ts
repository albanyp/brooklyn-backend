import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieFranchise } from '../../entity/movie-franchise';
import { MovieFranchiseController } from './movie-franchise.controller';
import { MovieFranchiseService } from './movie-franchise.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieFranchise])],
  controllers: [MovieFranchiseController],
  providers: [MovieFranchiseService]
})

export class MovieFranchiseModule {}