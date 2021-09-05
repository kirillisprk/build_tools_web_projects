'use strict';
import {Duration} from "luxon";
import {validateValueTimer, showButton} from '../utils.js'


let buttonRun = document.getElementById("buttonStart");
let buttonReset = document.getElementById("buttonReset");
let timerShow = document.getElementById("resultTimer");
let setTimer = document.getElementById("setTime");
let audioElement = new Audio('media/notification.mp3');
let statusTimer = false;

const renderResult = (text) => {
    timerShow.innerHTML = `${text}`
}
const setupTimerStart = () => {
    statusTimer = false;
    showButton(statusTimer, buttonRun, buttonReset);
}
const setupTimerEnd = () => {
    statusTimer = true;
    showButton(statusTimer, buttonRun, buttonReset);
    audioElement.play();
    renderResult('Время закончилось');
}
const createTimer = (valueTimer) => {
    setupTimerStart();
    let durationTimer = Duration.fromObject({milliseconds: valueTimer});
    const timer = setInterval(() => {
        if (durationTimer.milliseconds <= 0 || statusTimer) {
            clearInterval(timer);
            setupTimerEnd();
        } else {
            renderResult(durationTimer.toFormat('hh:mm:ss'));
            durationTimer = durationTimer.minus(1000);
        }
    }, 1000);
}

setTimer.addEventListener('change', () => validateValueTimer(setTimer.valueAsNumber, buttonRun));
buttonRun.addEventListener('click', () => createTimer(setTimer.valueAsNumber));
buttonReset.addEventListener('click', setupTimerEnd);





