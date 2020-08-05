var highScoresOlEl = document.querySelector("#highscores-ol")

function displayHighScores() {

  var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

  // can add sort()

  for(var i = 0; i < localStorageHighScores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = localStorageHighScores[i].name + " " + localStorageHighScores[i].score;
    liEl.classList.add("custom-li-css");
    highScoresOlEl.appendChild(liEl);
  }

}

displayHighScores();