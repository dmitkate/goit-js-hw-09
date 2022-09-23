
const startButton = document.querySelector('button[data-start]')
const stoptButton = document.querySelector('button[data-stop]')
const body = document.querySelector('body')
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartButton() {
    interval = setInterval(()=>
    {   
        stoptButton.disabled = false;
        startButton.disabled = true;
        body.style.backgroundColor = getRandomHexColor()
    },
        2000)
}
function onStopButton() {
    stoptButton.disabled = true;
    startButton.disabled = false;
    clearInterval(interval)
}


startButton.addEventListener('click', onStartButton)
stoptButton.addEventListener('click', onStopButton)
