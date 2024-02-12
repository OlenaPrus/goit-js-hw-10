import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');
const submitBtn = document.querySelector('button');

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  const getDelay = promiseForm.elements.delay.value;
  const radioIn = promiseForm.elements.state.value;
  event.target.reset();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioIn === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${getDelay}ms`);
      } else {
        reject(`❌ Rejected promise in ${getDelay}ms`);
      }
    }, getDelay);
  });

  promise
    .then(value => {
      iziToast.success({
        position: 'topRight',
        message: `${value}`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `${error}`,
      });
    });
});
