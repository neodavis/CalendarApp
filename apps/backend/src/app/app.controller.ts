import { Absence } from './absence';
import { AbsenceService } from './absence.service';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private absenceService: AbsenceService) {}

  @Get()
  getAbsences() {
    return this.absenceService.getAbsences();
  }

  @Post('/delete')
  deleteAbsence(@Body() body: { id: number }) {
    return this.absenceService.deleteAbsence(body.id)
  }

  @Post('/create')
  createAbsence(@Body() body: { absence: Absence }) {
    return this.absenceService.createAbsence(body.absence);
  }

  @Post('/edit')
  editAbsence(@Body() body: { absence: Absence }) {
    return this.absenceService.editAbsence(body.absence);
  }
}
