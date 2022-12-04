import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public data = [
    {
      start: moment(new Date("Sat Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Sat Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное ремя)")),
      type: "Відпустка",
      comment: "Lorem Ipsum1",
    },
    {
      start: moment(new Date("Sun Dec 03 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Sun Dec 04 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Лікарняний",
      comment: "Lorem Ipsum2",
    },
    {
      start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Лікарняний",
      comment: "Lorem Ipsum2",
    },
    {
      start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Лікарняний",
      comment: "Lorem Ipsum2",
    },
    {
      start: moment(new Date("Mon Dec 27 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Sun Dec 28 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Лікарняний",
      comment: "Lorem Ipsum2",
    },
    {
      start: moment(new Date("Tue Dec 06 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Tue Dec 07 2022 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Відпустка",
      comment: "Lorem Ipsum3",
    },
    {
      start: moment(new Date("Wen Jan 04 2023 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      end: moment(new Date("Thu Jan 06 2023 00:00:00 GMT+0200 (Восточная Европа, стандартное время)")),
      type: "Лікарняний",
      comment: "Lorem Ipsum4",
    }
  ];
}
