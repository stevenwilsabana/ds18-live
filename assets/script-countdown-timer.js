document.addEventListener('DOMContentLoaded', function () {
  // get from the editor field
  // const countdownTimer = document.querySelector('#custom-countdown-timer');
  // const customDate = countdownTimer.dataset.deadline;

  const now = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const customDate = `${month} ${day}, ${year} 23:59:59`;

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
