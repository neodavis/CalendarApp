import { AuthGuard } from '@nestjs/passport';
import { AbsenceService } from './absence.service';
import { Body, Controller, Delete, Get, Param, Headers, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { AbsenceDto } from "./absence.dto";
import { AbsenceEntity } from "./absence.entity";

@Controller()
export class AbsenceController {
  constructor(private absenceService: AbsenceService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('absence/get/')
  public async getAbsences(@Headers('Authorization') token: string): Promise<AbsenceEntity[]> {
    return this.absenceService.getAbsences(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('absence/delete/:id')
  public async deleteAbsence(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.absenceService.deleteAbsence(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('absence/create/')
  public async createAbsence(@Body('absence') absence: AbsenceDto, @Headers('Authorization') token: string): Promise<AbsenceEntity> {
    return this.absenceService.createAbsence(absence, token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('absence/edit/')
  public async editAbsence(@Body('absence') absence: AbsenceDto): Promise<AbsenceEntity> {
    return this.absenceService.editAbsence(absence);
  }
}