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
    private readonly absenceRepository: Repository<AbsenceEntity>
  ) {}

  public getAbsences(id: number): Promise<AbsenceEntity[]> {
    try {
      return this.absenceRepository.find({ where: { user_id: id } });
    } catch {
      throw new HttpException('Помилка запиті записів', HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAbsence(id: number): Promise<DeleteResult> {
    try {
      return await this.absenceRepository.delete({ id: id });
    } catch {
      throw new HttpException('Помилка при видаленні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async createAbsence(absence: AbsenceDto): Promise<AbsenceEntity> {
    let absenceEntity: AbsenceEntity = new AbsenceEntity();

    absenceEntity.id = absence.id;
    absenceEntity.user_id = absence.user_id;
    absenceEntity.start = moment(absence.start).toDate();
    absenceEntity.end = moment(absence.end).toDate();
    absenceEntity.comment = absence.comment;
    absenceEntity.type = absence.type;

    try {
      return await this.absenceRepository.save({
        id: absence.id,
        user_id: absence.user_id,
        start: moment(absence.start).toDate(),
        end: moment(absence.end).toDate(),
        comment: absence.comment,
        type: absence.type,
      });
    } catch {
      throw new HttpException( 'Помилка при створенні запису', HttpStatus.BAD_REQUEST);
    }
  }

  public async editAbsence(absence: AbsenceDto): Promise<AbsenceEntity> {
    try {
      return await this.absenceRepository.save({
        id: absence.id,
        user_id: absence.user_id,
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
