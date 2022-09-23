import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    daysRefs: document.querySelector('[data-days]'),
    hoursRefs: document.querySelector('[data-hours]'),
    minutesRefs: document.querySelector('[data-minutes]'),
    secondsRefs: document.querySelector('[data-seconds]'),
};

let intervalID = null;
refs.btnStart.disabled = true;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.btnStart.disabled = false;           
        }
        refs.btnStart.addEventListener("click", onButtonClick)
        function onButtonClick() {
            intervalID = setInterval(() => {
                refs.btnStart.disabled = true;
                const timeUnixLeft = selectedDates[0].getTime() - (new Date().getTime());
                const timeLeft = convertMs(timeUnixLeft);

                refs.daysRefs.textContent = addLeadingZero(timeLeft.days);
                refs.hoursRefs.textContent = addLeadingZero(timeLeft.hours);
                refs.minutesRefs.textContent = addLeadingZero(timeLeft.minutes);
                refs.secondsRefs.textContent = addLeadingZero(timeLeft.seconds);

                if (timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    timeLeft.seconds === 0) {
                    clearInterval(intervalID);
                };
            }, 1000
            );
        }
    },
};

flatpickr(refs.input, options);


