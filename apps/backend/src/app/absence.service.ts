import { AbsenceEntity } from './entities/absence.entity';
import { Absence } from './absence';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');

Injectable()
export class AbsenceService {
    constructor(@InjectRepository(AbsenceEntity) private readonly absenceRepository: Repository<AbsenceEntity>) {}

    getAbsences(): Promise<AbsenceEntity[]> {
      return this.absenceRepository.find();
    }

    async deleteAbsence(id: number): Promise<AbsenceEntity[]> {
      await this.absenceRepository.delete({ id: id });
      return this.absenceRepository.find();
    }

    async createAbsence(absence: Absence): Promise<AbsenceEntity[]> {
      let absenceEntity: AbsenceEntity = new AbsenceEntity();

      absenceEntity.id = absence.id
      absenceEntity.start = moment(absence.start).format()
      absenceEntity.end = moment(absence.end).format()
      absenceEntity.comment = absence.comment
      absenceEntity.type = absence.type

      await this.absenceRepository.save(absenceEntity)

      return this.absenceRepository.find()
    }

    async editAbsence(absence: Absence): Promise<AbsenceEntity[]> {
      await this.absenceRepository.save({
        id: absence.id,
        start: moment(absence.start).format(),
        end: moment(absence.end).format(),
        comment: absence.comment,
        type: absence.type,
      })

      return this.absenceRepository.find()
    }
}