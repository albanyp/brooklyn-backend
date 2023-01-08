import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieType } from '../../entity/movie-type';
import { MovieTypeController } from './movie-type.controller';
import { MovieTypeService } from './movie-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieType])],
  controllers: [MovieTypeController],
  providers: [MovieTypeService]
})

export class MovieTypeModule {}