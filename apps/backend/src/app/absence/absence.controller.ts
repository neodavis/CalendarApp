import { AbsenceService } from './absence.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { AbsenceDto } from "./absence.dto";
import { AbsenceEntity } from "./absence.entity";

@Controller()
export class AbsenceController {
  constructor(private absenceService: AbsenceService) {}

  @Get('absences/get/:token/')
  getAbsences(@Param('token') token: string): Promise<AbsenceEntity[]> {
    return this.absenceService.getAbsences(token);
  }

  @Delete('absence/delete/:id/:token')
  deleteAbsence(@Param('id', ParseIntPipe) id: number, @Param('token') token: string): Promise<DeleteResult> {
    return this.absenceService.deleteAbsence(id, token);
  }

  @Post('absence/create/:token/')
  createAbsence(@Body() body: AbsenceDto, @Param('token') token: string): Promise<AbsenceEntity | null> {
    return this.absenceService.createAbsence(body, token);
  }

  @Patch('absence/edit/:token/')
  editAbsence(@Body() body: AbsenceDto, @Param('token') token: string): Promise<AbsenceEntity | null> {
    return this.absenceService.editAbsence(body, token);
  }
}