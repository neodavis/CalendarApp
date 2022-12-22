import { AbsenceEntity } from './entities/absence.entity';
import { Absence } from './absence';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');

Injectable();
export class AbsenceService {
  constructor(
    @InjectRepository(AbsenceEntity)
    private readonly absenceRepository: Repository<AbsenceEntity>
  ) {}

  getAbsences(): Promise<AbsenceEntity[]> {
    return this.absenceRepository.find();
  }

  async deleteAbsence(id: number): Promise<boolean> {
    await this.absenceRepository.delete({ id: id });
    if (await this.absenceRepository.findOne({ where: { id: id } })) {
      throw new HttpException('Abcense Delete Error', HttpStatus.BAD_REQUEST)
    } else {
      return true;
    }
  }

  async createAbsence(absence: Absence): Promise<boolean> {
    let absenceEntity: AbsenceEntity = new AbsenceEntity();

    absenceEntity.id = absence.id;
    absenceEntity.start = moment(absence.start).toDate();
    absenceEntity.end = moment(absence.end).toDate();
    absenceEntity.comment = absence.comment;
    absenceEntity.type = absence.type;
    
    await this.absenceRepository.save({
      id: absence.id,
      start: moment(absence.start).format(),
      end: moment(absence.end).format(),
      comment: absence.comment,
      type: absence.type,
    })
    
    if (await this.absenceRepository.find({ where: { id: absence.id } })) {
      return true;
    } else {
      throw new HttpException('Abcense Create Error', HttpStatus.BAD_REQUEST)

    }
  }

  async editAbsence(absence: Absence): Promise<boolean> {
    await this.absenceRepository.save({
      id: absence.id,
      start: moment(absence.start).format(),
      end: moment(absence.end).format(),
      comment: absence.comment,
      type: absence.type,
    });

    if (await this.absenceRepository.find({ where: { id: absence.id} })) {
      return true
    } else {
      throw new HttpException('Abcense Edit Error', HttpStatus.BAD_REQUEST)
    }
  }
}
