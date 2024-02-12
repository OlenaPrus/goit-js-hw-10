// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedData = selectedDates[0];
    const initialTimer = selectedData.getTime() - new Date().getTime();
    const renderTimer = convertMs(initialTimer);

    if (selectedData < new Date()) {
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedData;
    }
  },
};
const fp = flatpickr(myInput, options);

startBtn.addEventListener('click', () => {
  const selectedTime = userSelectedDate.getTime();
  myInput.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  const timerInterval = setInterval(() => {
    const currentTime = Date.now();
    let remainingTime = selectedTime - currentTime;
    const numberOfTimer = convertMs(remainingTime);

    if (remainingTime <= 0) {
      iziToast.info({
        position: 'topRight',
        message: 'Time is up',
      });
      clearInterval(timerInterval);
    } else {
      timerDay.textContent = `${numberOfTimer.days}`;
      timerHours.textContent = `${numberOfTimer.hours}`;
      timerMinutes.textContent = `${numberOfTimer.minutes}`;
      timerSeconds.textContent = `${numberOfTimer.seconds}`;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, '0');
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    '0'
  );
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
