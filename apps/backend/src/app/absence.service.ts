import { Absence } from 'libs/api-interfaces/absence';
import { Injectable } from '@nestjs/common';
import moment = require('moment');

Injectable()
export class AbsenceService {
    getAbsences(): Absence[] {
        return [
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
    }
}