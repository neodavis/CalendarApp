import { AbsenceService } from './absence.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [AbsenceService]
})
export class AppModule {}
