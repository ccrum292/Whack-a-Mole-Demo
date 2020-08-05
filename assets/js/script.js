var beginButtonEl = document.querySelector("#begin-button");
var firstMoleImgEl = document.querySelector("#first-mole");
var timerDivEl = document.querySelector(".timer");
var scoreDivEl = document.querySelector(".score");
var containerDivEl = document.querySelector(".container");

var timerInterval;
var time = 0;
var timeCap = 15;
var numberOfWhacks = 0;
var moleLocationId;
var moleTimeout;

beginButtonEl.addEventListener("click", begin)

function begin(){
  beginButtonEl.setAttribute("style", "display: none !important");
  firstMoleImgEl.setAttribute("style", "display: none !important");
  timerDivEl.setAttribute("style", "display: block !important");
  scoreDivEl.setAttribute("style", "display: block !important");
  containerDivEl.setAttribute("style", "display: block !important");

  timerInterval = setInterval(tickUp, 1000);
  destroyOldMoleAndCreateNewMole();
}

function tickUp(){
  time++;
  timerDivEl.children[0].textContent = "Timer: " + time;

  // check if user ran out of time
  if (time >= timeCap) {
    end();
  }
}

function destroyOldMoleAndCreateNewMole() {
  if (moleLocationId || moleLocationId === 0){
    document.getElementById(moleLocationId).children[1].remove();
  }
  var newMoleImg = document.createElement("img");
  newMoleImg.classList.add("mole");
  newMoleImg.classList.add("h-50");
  newMoleImg.setAttribute("alt", "mole");
  newMoleImg.setAttribute("src", "./assets/img/101-1019722_cute-mole-clipart-transparent-mole-clipart.png")

  newMoleImg.addEventListener("click", countWhack)

  moleLocationId = randomLocationGenerator();
  document.getElementById(moleLocationId).appendChild(newMoleImg);

  // if(moleTimeout){
  //   console.log("moleTimeout")
  //   clearTimeout(moleTimeout)
  // }else{
  //   console.log("moleTimeout2")
  // }
  // moleTimeout = setTimeout(destroyOldMoleAndCreateNewMole, 2000);
}

function countWhack() {
  numberOfWhacks++
  scoreDivEl.children[0].textContent = "Score: " + numberOfWhacks;
  destroyOldMoleAndCreateNewMole()
}


function setMoleTimeout() {
  moleTimeout = setTimeout(destroyOldMoleAndCreateNewMole, 2000);
}

function randomLocationGenerator() {
  var randomLocation = Math.floor(Math.random()*9);
  if(randomLocation !== moleLocationId){
    return randomLocation
  }else{
    return randomLocationGenerator()
  }
}


function end() {
  clearInterval(timerInterval)
  timerDivEl.setAttribute("style", "display: none !important");
  containerDivEl.setAttribute("style", "display: none !important");
}
