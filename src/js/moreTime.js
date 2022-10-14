export default class MoreTime {
  constructor(cards) {
    this.cards = cards;
    this.init(this.cards);
  }

  cropTimes(lastSpan) {
    const lastValue = lastSpan.innerHTML;
    lastSpan.innerHTML = 'ещё...';
    lastSpan.addEventListener('click', (e) => {
      const hiddenSpans = document.querySelectorAll(
        '.features__time-badge.visually-hidden'
      );
      for (const span of hiddenSpans) {
        span.classList.remove('visually-hidden');
      }
      e.target.innerHTML = lastValue;
    });
    do {
      lastSpan = lastSpan.nextElementSibling;
      lastSpan.classList.add('visually-hidden');
    } while (lastSpan.nextElementSibling);
  }

  init(cards) {
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    for (const card of cards) {
      let spanClosest = card.querySelector('.features__closest');
      const timeBadges = card.querySelectorAll('.features__time-badge');
      let counter = 0;
      let lastSpan;

      for (const span of timeBadges) {
        if (span.offsetLeft === spanClosest.offsetLeft) {
          lastSpan = span.previousElementSibling;
          if (mediaQuery.matches) {
            counter++;
            if (counter !== 2) continue;
            lastSpan = span.previousElementSibling;
          }

          this.cropTimes(lastSpan);

          break;
        }
      }
    }
  }
}
