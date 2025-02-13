const timer = document.getElementById("timer")
const progress_bar = document.getElementById("progress-bar")
const time_together = document.getElementById("time-together")
const rose = document.getElementById("rose")
const heart_container = document.getElementById("heart-container")
const together_for = document.getElementById("together-for")

const last_date = "2025-01-18T23:59:59"
const end_date = "2025-03-01T06:20:00"

const together_date = "2024-04-29"

function timeDiff(targetDate){
  const now = new Date();
  const futureDate = new Date(targetDate);
  return futureDate - now;
}

function updateCountdown(targetDate) {
  
  function calculateTimeRemaining() {
    
    const diff = timeDiff(targetDate)

    if (diff <= 0) {
      timer.innerText = "<3"
      return;
    }

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timer.innerText = `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    progressBar();

  }

  function progressBar(){
    const diff = timeDiff(targetDate)

    const overall_diff = new Date(end_date) - new Date(last_date);
    const percentage = diff / overall_diff * 100

    progress_bar.style.backgroundImage = `linear-gradient(to right, aquamarine ${percentage}%, rgba(0,0,0,0) ${percentage}%)`
  }

  calculateTimeRemaining();

  setInterval(calculateTimeRemaining, 1000);
}

updateCountdown(end_date)


function timeTogether(){
  const diff = Math.abs(timeDiff(together_date))

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  together_for.innerText = `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

setInterval(timeTogether, 1000)

function spawnHearts(){

  const widthPx = screen.width
  const ySpawn = screen.height + 100

  for (let i = 0; i < 20; i++) {
    const randIntX = Math.floor(Math.random() *  widthPx);
    const randIntY = Math.floor(Math.random() * 600);
    
    const heart = document.createElement("div")
    const image = document.createElement("img")

    heart.classList.add("heart")
    heart.appendChild(image)
    image.src = "imgs/heart.svg"



    heart.style.position = "absolute";
    heart.style.width = "20px";
    heart.style.height = "20px";
    heart.style.left = `${randIntX}px`;
    heart.style.top = `${ySpawn + randIntY}px`;
    image.style.width = "50px";
    image.style.height = "50px";
    image.style.rotate = `${Math.floor(Math.random() * 360)}deg`;
    image.classList.add("heart-img")

    heart_container.appendChild(heart);

    
  }
}

function moveHearts(){
  Array.from(heart_container.children).forEach(heart => {
    let pos = heart.getBoundingClientRect().top;
    if(pos < -100){
      heart.remove();
    }else{
      heart.style.top = `${pos - 10}px`
    }
  })
}

rose.addEventListener("click", ()=>{
  rose.style.scale = "1.1"
  setTimeout(() =>{rose.style.scale = "1"}, 50)
  spawnHearts();
})

setInterval(moveHearts, 1000/60);