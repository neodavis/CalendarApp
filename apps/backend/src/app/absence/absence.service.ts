import { AbsenceDto } from './absence.dto';
import { AbsenceEntity } from './absence.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import moment = require('moment');

Injectable();
export class AbsenceService {
  constructor(
    @InjectRepository(AbsenceEntity)
    private readonly absenceRepository: Repository<AbsenceEntity>
  ) {}

  public getAbsences(): Promise<AbsenceEntity[]> {
    return this.absenceRepository.find();
  }

  public async deleteAbsence(id: number): Promise<DeleteResult> {
      try {
        return await this.absenceRepository.delete({ id: id })
      } catch {
        throw new HttpException('Abcense Delete Error', HttpStatus.BAD_REQUEST)
      }   
  }

  public async createAbsence(absence: AbsenceDto): Promise<AbsenceEntity> {
    let absenceEntity: AbsenceEntity = new AbsenceEntity();

    absenceEntity.id = absence.id;
    absenceEntity.start = moment(absence.start).toDate();
    absenceEntity.end = moment(absence.end).toDate();
    absenceEntity.comment = absence.comment;
    absenceEntity.type = absence.type;
    
    try {
      return await this.absenceRepository.save({
        id: absence.id,
        start: moment(absence.start).toDate(),
        end: moment(absence.end).toDate(),
        comment: absence.comment,
        type: absence.type,
      })
    } catch {
      throw new HttpException('Abcense Create Exception', HttpStatus.BAD_REQUEST)
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
      throw new HttpException('Absence Edit Exception', HttpStatus.BAD_REQUEST)
    } 

  }
}
