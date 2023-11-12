const fly = document.getElementById("fly");
const kitchen = document.querySelector(".kitchen");
const heartsDisplay = document.getElementById("hearts");
const levelDisplay = document.getElementById("level");
const timerDisplay = document.getElementById("timer");


let level = 1; 
let hearts = 3;
let timeLeft = 10;

function updateHearts() {
    heartsDisplay.textContent = "Hearts: " + hearts
}

function updateLevel() {
    levelDisplay.textContent = "Level: " + level;
}

let moveInterval = setInterval(moveFly, 2000 / level);

function resetTimer(){
    clearInterval(timerInterval);
    timeLeft = 10;
    timerInterval = setInterval(updateTimer, 1000);
}

let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = "Time left: " + timeLeft + " seconds";
  if (timeLeft === 0) {
    missFly();
  }
}


function missFly() {
    hearts--;
    updateHearts();
    if (hearts === 0) {
      alert("Game Over!");
      clearInterval(moveInterval);
      clearInterval(timerInterval);
    } else {
      resetTimer();
    }
  }


  
function catchFly() {
    level++;
    updateLevel();
    resetTimer();
  }
  function fallFly(flyElement, kitchen) {
    const currentTop = flyElement.getBoundingClientRect().top;
    const kitchenBottom = kitchen.getBoundingClientRect().bottom;
    const fallDistance = kitchenBottom - currentTop - flyElement.offsetHeight;
    flyElement.style.transition = "transform 3s linear";
    flyElement.style.transform = `translateY(${fallDistance}px)`;
  }
  
  fly.addEventListener("click", function () {
    hearts++;
    const activeFly = this.querySelector(".active-fly");
    const crushedFly = this.querySelector(".crushed-fly");
    const speechBubble = this.querySelector(".speech-bubble");
  
    activeFly.style.display = "none";
    crushedFly.style.display = "block";
  
    fallFly(crushedFly, kitchen);
    fallFly(speechBubble, kitchen);
  
    speechBubble.textContent = "Oh no, splat!";
    showSpeechBubble("Oh no, splat!");
    catchFly();
  
    clearInterval(moveInterval);
  
    setTimeout(function () {
      activeFly.style.display = "block";
      crushedFly.style.display = "none";
      crushedFly.style.transform = "translateY(0)";
      speechBubble.style.transform = "translateY(0)";
      hideSpeechBubble();
      moveInterval = setInterval(moveFly, 2000 / level);
      resetTimer();
    }, 3000);
  });
  
  function showSpeechBubble(message) {
    const speechBubble = fly.querySelector(".speech-bubble");
    speechBubble.textContent = message;
    speechBubble.classList.add("show");
  }
  
  function hideSpeechBubble() {
    const speechBubble = fly.querySelector(".speech-bubble");
    speechBubble.classList.remove("show");
  }
  kitchen.addEventListener("click", missFly);
  
  showSpeechBubble("Ready, Set, Fly!");
  
  function moveFly() {
    const speedMultiplier = level * 0.5;
    const x = Math.random() * (kitchen.offsetWidth - fly.offsetWidth);
    const y = Math.random() * (kitchen.offsetHeight - fly.offsetHeight);

    fly.style.transition = `top ${2 / speedMultiplier}s, left ${
    2 / speedMultiplier
    }s linear`;
    fly.style.left = x + "px";
    fly.style.top = y + "px";
    showSpeechBubble("Ha ha, too slow!");
  }
  updateHearts();
  updateLevel();
  showSpeechBubble("Ready, Set, Fly!");


