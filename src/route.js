import './scss/main.scss';
import FormRoute from './js/formRoute.js';

const form = document.forms['form-route'];
const abSchedule = [
  '08/21/2021 18:00:00',
  '08/21/2021 18:30:00',
  '08/21/2021 18:45:00',
  '08/21/2021 19:00:00',
  '08/21/2021 19:15:00',
  '08/21/2021 21:00:00',
];
const baSchedule = [
  '08/21/2021 18:30:00',
  '08/21/2021 18:45:00',
  '08/21/2021 19:00:00',
  '08/21/2021 19:15:00',
  '08/21/2021 19:35:00',
  '08/21/2021 21:50:00',
  '08/21/2021 21:55:00',
];

new FormRoute(form, abSchedule, baSchedule);
