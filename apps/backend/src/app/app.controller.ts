import { AbsenceService } from './absence.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private absenceService: AbsenceService) {}

  @Get()
  getAbsences() {
    return this.absenceService.getAbsences()
  }
}
