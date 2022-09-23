import Notiflix from 'notiflix';

const form = document.querySelector(".form")

form.addEventListener('submit', onSubmit)



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, rejecte) => {
    if (shouldResolve) {
     resolve({ position, delay });
  } else {
    rejecte({ position, delay });
  }
  }, delay)
}

function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  let delayInput = Number(delay.value);
  const stepInput = Number(step.value);
  const amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
      delayInput += stepInput;
  }
  event.currentTarget.reset();
}
