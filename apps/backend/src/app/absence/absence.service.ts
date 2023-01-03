import { JwtService } from '@nestjs/jwt';
import { AbsenceDto } from './absence.dto';
import { AbsenceEntity } from './absence.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import moment = require('moment');

Injectable();
export class AbsenceService {
  constructor(
    @InjectRepository(AbsenceEntity)
    private readonly absenceRepository: Repository<AbsenceEntity>,
    private readonly jwtService: JwtService
  ) { }

  public async getAbsences(token: string): Promise<AbsenceEntity[]> {
    try {
      token = token.replace('Bearer ', '');
      const data = this.jwtService.verify(token);

      return await this.absenceRepository.find({ where: { userId: data.userId } });
    } catch {
      throw new HttpException('Помилка при запиті записів', HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAbsence(id: number, token: string): Promise<DeleteResult> {
    try {
      token = token.replace('Bearer ', '');
      const data = this.jwtService.verify(token);

      return await this.absenceRepository.delete({ id: id, userId: data.userId });
    } catch {
      throw new HttpException('Помилка при видаленні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async createAbsence(absence: AbsenceDto, token: string): Promise<AbsenceEntity> {
    try {
      token = token.replace('Bearer ', '');
      const data = this.jwtService.verify(token);

      return await this.absenceRepository.save({
        id: absence.id,
        userId: Number(data.userId),
        start: moment(absence.start).toDate(),
        end: moment(absence.end).toDate(),
        comment: absence.comment,
        type: absence.type,
      });
    } catch {
      throw new HttpException('Помилка при створенні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async editAbsence(absence: AbsenceDto): Promise<AbsenceEntity> {
    try {
      return await this.absenceRepository.save({
        id: absence.id,
        start: moment(absence.start).toDate(),
        end: moment(absence.end).toDate(),
        comment: absence.comment,
        type: absence.type,
      });
    } catch {
      throw new HttpException('Помилка при зміні запису', HttpStatus.BAD_REQUEST);
    }
  }
}
