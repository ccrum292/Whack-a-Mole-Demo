var beginButtonEl = document.querySelector("#begin-button");
var firstMoleImgEl = document.querySelector("#first-mole");
var timerDivEl = document.querySelector(".timer");
var scoreDivEl = document.querySelector(".score");
var containerDivEl = document.querySelector(".container");
var saveFormEl = document.querySelector("#save-form");
var saveInputEl = document.querySelector("#name-input")
var saveButtonEl = document.querySelector("#save-button")
var main = document.querySelector("main");

var timerInterval;
var time = 0;
var timeCap = 15;
var numberOfWhacks = 0;
var moleLocationId;
var moleTimeout;

beginButtonEl.addEventListener("click", begin)

function begin(){
  if(event.target.matches("button")){
    beginButtonEl.setAttribute("style", "display: none !important");
    firstMoleImgEl.setAttribute("style", "display: none !important");
    timerDivEl.setAttribute("style", "display: block !important");
    scoreDivEl.setAttribute("style", "display: block !important");
    containerDivEl.setAttribute("style", "display: block !important");

    timerInterval = setInterval(tickUp, 1000);
    destroyOldMoleAndCreateNewMole();
  }
}

function tickUp(){
  time++;
  timerDivEl.children[0].textContent = "Timer: " + time;

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
}

function countWhack() {
  numberOfWhacks++
  scoreDivEl.children[0].textContent = "Score: " + numberOfWhacks;
  destroyOldMoleAndCreateNewMole()
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
  scoreDivEl.setAttribute("style", "display: none !important");
  containerDivEl.setAttribute("style", "display: none !important");
  saveFormEl.setAttribute("style", "display: block !important");
  main.classList.add("align-items-center");
}


saveButtonEl.addEventListener("click", saveScoreAndMoveUser);


function saveScoreAndMoveUser() {
  event.preventDefault();
  
  var name = saveInputEl.value.trim();

  if (name !== "") {
    var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

    var newEntry = {
      name: name,
      score: numberOfWhacks
    }

    localStorageHighScores.push(newEntry);
    window.localStorage.setItem("localStorageHighScores", JSON.stringify(localStorageHighScores))

    window.location.href = "highscores.html";
  }

}
