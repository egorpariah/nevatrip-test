import './scss/main.scss';
import FormRoute from './js/formRoute.js';

const form = document.forms['form-route'];
const abSchedule = [
  '2021-08-21 18:00:00',
  '2021-08-21 18:30:00',
  '2021-08-21 18:45:00',
  '2021-08-21 19:00:00',
  '2021-08-21 19:15:00',
  '2021-08-21 21:00:00',
];
const baSchedule = [
  '2021-08-21 18:30:00',
  '2021-08-21 18:45:00',
  '2021-08-21 19:00:00',
  '2021-08-21 19:15:00',
  '2021-08-21 19:35:00',
  '2021-08-21 21:50:00',
  '2021-08-21 21:55:00',
];

new FormRoute(form, abSchedule, baSchedule);
