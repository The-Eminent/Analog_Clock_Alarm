const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

// set our variables
var time, alarm, currentH, currentM,
  activeAlarm = false,
  sound = new Audio("Crisp Ring ! Vivo ! Call Tune ! Bgm ! Theme.mp3");
// sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");

// loop alarm
sound.loop = true;

function setDate() {
  const now = new Date();
  time = now.toLocaleTimeString();
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    if (time === alarm) {
        sound.play();

        // show snooze button
        snooze.className = "";
    }
}

setInterval(setDate, 1000);

setDate();


// add option values relative towards time
function addMinSecVals(id) {
  var select = id;
  var min = 59;

  for (i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}

function addHours(id) {
  var select = id;
  var hour = 12;

  for (i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes1);
addMinSecVals(seconds1);
addHours(hours1);

// set and clear alarm
startstop.onclick = function() {
  // set the alarm
  if (activeAlarm === false) {
    hours1.disabled = true;
    minutes1.disabled = true;
    seconds1.disabled = true;
    ampm.disabled = true;

    alarm = hours1.value + ":" + minutes1.value + ":" + seconds1.value + " " + ampm.value;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    // clear the alarm
    hours1.disabled = false;
    minutes1.disabled = false;
    seconds1.disabled = false;
    ampm.disabled = false;

    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";

    // hide snooze button
    snooze.className = "hide";
    activeAlarm = false;
  }
};

// snooze for 5 minutes
snooze.onclick = function() {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);

    if (currentM >= "55") {
      minutes1.value = "00";
      hours1.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes1.value = "0" + parseInt(currentM + 5);
      } else {
        minutes1.value = parseInt(currentM) + 5;
      }
    }

    // hide snooze button
    snooze.className = "hide";

    // now reset alarm
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};
