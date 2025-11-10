document.addEventListener('DOMContentLoaded', function () {
  const countdownTimer = document.querySelector('#custom-countdown-timer');
  const customDate = countdownTimer.dataset.deadline;
  //   const customDate = '{{ section.settings.deadline }}';
  const saleEndDate = new Date(customDate).getTime();
  const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = saleEndDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer__value--days').innerText = days
      .toString()
      .padStart(2, '0');
    document.getElementById('countdown-timer__value--hours').innerText = hours
      .toString()
      .padStart(2, '0');
    document.getElementById('countdown-timer__value--minutes').innerText = minutes
      .toString()
      .padStart(2, '0');
    document.getElementById('countdown-timer__value--seconds').innerText = seconds
      .toString()
      .padStart(2, '0');

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.getElementById('countdown').innerHTML = 'SALE ENDED';
    }
  }, 1000);
});
