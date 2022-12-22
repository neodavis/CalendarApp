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
    try {
      return this.absenceService.deleteAbsence(body.id)
    } catch (error) {
      Logger.log(error)
      return error
    }
  }

  @Post('/create')
  createAbsence(@Body() body: { absence: Absence }) {
    try {
      return this.absenceService.createAbsence(body.absence);
    } catch (error) {
      Logger.log(error)
      return error
    }
  }

  @Post('/edit')
  editAbsence(@Body() body: { absence: Absence }) {
    try {
      return this.absenceService.editAbsence(body.absence);
    } catch (error) {
      Logger.log(error)
      return error
    }
  }
}
