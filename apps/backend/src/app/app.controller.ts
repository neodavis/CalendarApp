import { DeleteResult } from 'typeorm';
import { AbsenceEntity } from './absence/absence.entity';
import { Absence } from './absence/absence';
import { AbsenceService } from './absence/absence.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AbsenceDto } from './absence/absence.dto';

@Controller()
export class AppController {
  constructor(private absenceService: AbsenceService) {}

  @Get()
  getAbsences(): Promise<AbsenceEntity[]> {
    return this.absenceService.getAbsences();
  }

  @Delete('/delete/:id')
  deleteAbsence(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.absenceService.deleteAbsence(id);
  }

  @Post('/create')
  createAbsence(@Body() body: AbsenceDto ): Promise<AbsenceEntity | null> {
    return this.absenceService.createAbsence(body);
  }

  @Patch('/edit')
  editAbsence(@Body() body: AbsenceDto ): Promise<AbsenceEntity | null> {
    return this.absenceService.editAbsence(body);
  }
}
