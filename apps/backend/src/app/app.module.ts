import { AbsenceEntity } from './entities/absence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceService } from './absence.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import config from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([AbsenceEntity]),
  ],
  controllers: [AppController],
  providers: [AbsenceService],
})
export class AppModule {}
