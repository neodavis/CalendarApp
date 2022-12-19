import { Absence } from './absence';
import { Injectable } from '@nestjs/common';
import moment = require('moment');

Injectable()
export class AbsenceService {
    absences: Absence[] = [
      {
        id: 1371133012312,
        start: moment("2022-12-02T22:00:00.000Z"),
        end: moment("2022-12-09T22:00:00.000Z"),
        type: 'Відпустка',
        comment: 'Lorem Ipsum1',
      },
      {
        id: 1671273037078,
        start: moment("2022-12-13T22:00:00.000Z"),
        end: moment("2022-12-20T22:00:00.000Z"),
        type: 'Лікарняний',
        comment: '123123',
      },
    ];

    getAbsences(): Absence[] {
        return this.absences
    }

    deleteAbsence(id: number): Absence[] {
      this.absences = this.absences.filter((absence: Absence) => {
        return absence.id != id
      })

      return this.absences
    }

    createAbsence(absence: Absence): Absence[] {
      this.absences.push(absence)

      return this.absences
    }

    editAbsence(abs: Absence): Absence[] {
      this.absences = this.absences.map((absence: Absence) => {
        return absence.id === abs.id ? abs : absence
      })

      return this.absences
    }
}