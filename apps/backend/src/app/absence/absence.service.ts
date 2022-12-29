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
  ) {}

  public async getAbsences(token: string): Promise<AbsenceEntity[]> {
    try {
      const data = await this.jwtService.verify(token)
      return await this.absenceRepository.find({ where: {userId: data.userId} })
    } catch {
      throw new HttpException('Помилка при запиті записів', HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAbsence(id: number, token: string): Promise<DeleteResult> {
    try {
      const data = this.jwtService.verify(token)
      return await this.absenceRepository.delete({ id: id, userId: data.userId });
    } catch {
      throw new HttpException('Помилка при видаленні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async createAbsence(absence: AbsenceDto, token: string): Promise<AbsenceEntity> {
    try {
      const data = this.jwtService.verify(token)
      return await this.absenceRepository.save({
        userId: Number(data.userId),
        start: moment(absence.start).toDate(),
        end: moment(absence.end).toDate(),
        comment: absence.comment,
        type: absence.type,
      });
    } catch {
      throw new HttpException( 'Помилка при створенні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async editAbsence(absence: AbsenceDto, token: string): Promise<AbsenceEntity> {
    try {
      const data = this.jwtService.verify(token)
      const user = await this.absenceRepository.findOne( {where: {userId: data.userId}} )

      return await this.absenceRepository.save({
        ...user,
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
