import { AbsenceEntity } from './entities/absence.entity';
import { Absence } from './absence';
import { AbsenceService } from './absence.service';
import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private absenceService: AbsenceService) {}

  @Get()
  getAbsences(): Promise<AbsenceEntity[]> {
    return this.absenceService.getAbsences();
  }

  @Delete('/delete/:id')
  deleteAbsence(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.absenceService.deleteAbsence(id)
  }

  @Post('/create')
  createAbsence(@Body() body: { absence: Absence }): Promise<AbsenceEntity | null> {
    return this.absenceService.createAbsence(body.absence);
  }

  @Patch('/edit')
  editAbsence(@Body() body: { absence: Absence }): Promise<AbsenceEntity | null> {
    return this.absenceService.editAbsence(body.absence);
  }
}
