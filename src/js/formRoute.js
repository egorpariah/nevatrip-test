import optionTemplate from '../templates/option.hbs';

export default class FormRoute {
  constructor(element, abSchedule, baSchedule) {
    this.form = element;
    this.abSchedule = abSchedule;
    this.baSchedule = baSchedule;

    this.form.elements['time-ab'].innerHTML = optionTemplate({
      schedule: this.transformTime(abSchedule),
      direction: 'из A в B',
    });
    this.form.elements['time-ba'].innerHTML = optionTemplate({
      schedule: this.transformTime(baSchedule),
      direction: 'из B в A',
    });
    this.form.elements.route.addEventListener('change', () => {
      this.showTimeSelect();
    });
    this.form.elements['time-ab'].addEventListener('change', () => {
      this.filterBASchedule();
      console.log(this.calculateRouteTime());
    });
    this.form.elements.button.addEventListener('click', (e) => {
      e.preventDefault();
      const result = document.querySelector('.route__result');
      result.innerHTML = this.generateResult();
    });
  }

  showTimeSelect() {
    const abSelect = this.form.elements['time-ab'];
    const baSelect = this.form.elements['time-ba'];

    if (this.form.elements.route.value === 'из A в B') {
      this.form.elements['time-ab'].classList.remove('visually-hidden');
      this.form.elements['time-ba'].classList.add('visually-hidden');
      for (let i = 0; i < abSelect.children.length; i++) {
        abSelect.children[i].removeAttribute('disabled');
      }
      abSelect.selectedIndex = 0;
    }

    if (this.form.elements.route.value === 'из B в A') {
      this.form.elements['time-ab'].classList.add('visually-hidden');
      this.form.elements['time-ba'].classList.remove('visually-hidden');
      for (let i = 0; i < baSelect.children.length; i++) {
        baSelect.children[i].removeAttribute('disabled');
      }
      baSelect.selectedIndex = 0;
    }

    if (this.form.elements.route.value === 'из A в B и обратно в А') {
      this.form.elements['time-ab'].classList.remove('visually-hidden');
      this.form.elements['time-ba'].classList.remove('visually-hidden');
      abSelect.selectedIndex = 0;
      this.filterBASchedule();
    }
  }

  transformTime(schedule) {
    return schedule.map((item) => {
      const event = new Date(`${item} GMT+0300`);
      const currentTime = new Date(event.toString());
      return {
        time:
          currentTime.getHours().toString().padStart(2, '0') +
          ':' +
          currentTime.getMinutes().toString().padStart(2, '0'),
      };
    });
  }

  filterBASchedule() {
    const selectedABTime = new Date(
      `${this.abSchedule[this.form.elements['time-ab'].selectedIndex]} GMT+0300`
    );
    const routeABEnd = selectedABTime.getTime() + 50 * 60000;
    const baSelect = this.form.elements['time-ba'];

    for (let i = 0; i < baSelect.children.length; i++) {
      baSelect.children[i].removeAttribute('disabled');
    }

    for (let i = 0; i < baSelect.children.length; i++) {
      const currentBATime = new Date(`${this.baSchedule[i]} GMT+0300`);
      const msBATime = currentBATime.getTime();
      if (routeABEnd >= msBATime) {
        baSelect.children[i].setAttribute('disabled', '');
      } else {
        baSelect.selectedIndex = [i];
        return;
      }
    }
  }

  calculatePrice() {
    let price = 700;
    if (this.form.elements.route.value === 'из A в B и обратно в А') price = 1200;
    return price * this.form.elements.num.value;
  }

  calculateRouteTime() {
    let routeTime = 50;

    if (this.form.elements.route.value === 'из A в B и обратно в А') {
      const selectedABTime = new Date(
        `${this.abSchedule[this.form.elements['time-ab'].selectedIndex]} GMT+0300`
      );
      const routeStart = selectedABTime.getTime();

      const selectedBATime = new Date(
        `${this.baSchedule[this.form.elements['time-ba'].selectedIndex]} GMT+0300`
      );
      const routeEnd = selectedBATime.getTime();

      routeTime += (routeEnd - routeStart) / 60000;
    }

    return routeTime;
  }

  calculateEndTime() {
    if (this.form.elements.route.value === 'из A в B') {
      const selectedABTime = new Date(
        `${this.abSchedule[this.form.elements['time-ab'].selectedIndex]} GMT+0300`
      );
      const routeStart = selectedABTime.getTime();
      const routeEnd = new Date(routeStart + 50 * 60000);
      return routeEnd.toTimeString().split(' ')[0];
    }

    if (this.form.elements.route.value === 'из B в A') {
      const selectedBATime = new Date(
        `${this.abSchedule[this.form.elements['time-ba'].selectedIndex]} GMT+0300`
      );
      const routeStart = selectedBATime.getTime();
      const routeEnd = new Date(routeStart + 50 * 60000);
      return routeEnd.toTimeString().split(' ')[0];
    }

    if (this.form.elements.route.value === 'из A в B и обратно в А') {
      const selectedABTime = new Date(
        `${this.abSchedule[this.form.elements['time-ab'].selectedIndex]} GMT+0300`
      );
      const routeStart = selectedABTime.getTime();
      const routeEnd = new Date(routeStart + this.calculateRouteTime() * 60000);
      return routeEnd.toTimeString().split(' ')[0];
    }
  }

  wordInflection(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }

  // prettier-ignore
  generateResult() {
    return `Вы выбрали ${this.form.elements.num.value} ${this.wordInflection(this.form.elements.num.value, ['билет','билета','билетов'])} по маршруту ${this.form.elements.route.value} стоимостью ${this.calculatePrice()} рублей.
<br>Это путешествие займет у вас ${this.calculateRouteTime()} минут.<br>
Теплоход отправляется в ${this.form.elements['time-ab'].value.split(' ')[0]}, а прибудет в ${this.calculateEndTime()}.`;
  }
}
