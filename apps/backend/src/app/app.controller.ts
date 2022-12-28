import { UserService } from './user/user.service';
import { UserDto } from './user/user.dto';
import { DeleteResult } from 'typeorm';
import { AbsenceEntity } from './absence/absence.entity';
import { AbsenceService } from './absence/absence.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AbsenceDto } from './absence/absence.dto';
import { UserEntity } from './user/user.entity';
import { User } from 'libs/interfaces/src/lib/user';

@Controller()
export class AppController {
  constructor(
    private absenceService: AbsenceService,
    private userService: UserService
  ) {}

  @Get('absences/get/:id/')
  getAbsences(@Param('id', ParseIntPipe) id: number): Promise<AbsenceEntity[]> {
    return this.absenceService.getAbsences(id);
  }

  @Delete('absence/delete/:id/')
  deleteAbsence(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.absenceService.deleteAbsence(id);
  }

  @Post('absence/create/')
  createAbsence(@Body() body: AbsenceDto): Promise<AbsenceEntity | null> {
    return this.absenceService.createAbsence(body);
  }

  @Patch('absence/edit/')
  editAbsence(@Body() body: AbsenceDto): Promise<AbsenceEntity | null> {
    return this.absenceService.editAbsence(body);
  }

  @Post('user/login/')
  userLogin(@Body() body: UserDto): Promise<{ token: string }> {
    return this.userService.userLogin(body);
  }

  @Get('user/auth/:token')
  userAuth(@Param('token') token: string) {
    return this.userService.userAuth(token);
  }

  @Post('user/register/')
  userRegister(@Body() body: User): Promise<UserEntity> {
    return this.userService.userRegister(body);
  }
}
