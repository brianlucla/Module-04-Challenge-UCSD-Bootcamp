// retrieve elements to modify
var olElement = document.getElementById("appendList");
var clearEl = document.getElementById("clear-scores");

// retrive and print scores to window
function getScores(){
  var scores = JSON.parse(window.localStorage.getItem('scores')) || [];
  console.log(scores[0].userInitial);
  for (let i = 0; i < scores.length; i++){
    var createLi = document.createElement('li');
    createLi.textContent = scores[i].userInitial + ": " + scores[i].userScore;
    createLi.style.color = "purple";
    createLi.style.backgroundColor = "pink"
    createLi.style.paddingBottom = "2px";
    createLi.style.border = "solid 1px black";
    olElement.appendChild(createLi);
  }
}

// clear scores from local storage and window
function clearScores(){
  window.localStorage.removeItem('scores');
  window.location.href = "scores.html";
}

// add event listener for clicking the clear score button
clearEl.addEventListener("click", clearScores);

// retrieve scores and print on page load
getScores();