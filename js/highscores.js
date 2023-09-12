var clearScoresBtn = document.querySelector('#clear-scores');

function clearScores() {
  console.log('Clear Scores!');
  localStorage.clear();
  createHighScoreList();
}

function createHighScoreList() {
  var scoreList = document.querySelector('#high-score-list');
  let position = 1;

  let playersFromStorage;
//students.sort((a, b) => a.age - b.age);
  if (localStorage.getItem('player') !== null) {
    playersFromStorage = JSON.parse(localStorage.getItem('player'));
    
    playersFromStorage.sort((a, b) =>  b.highScore - a.highScore );

    playersFromStorage.forEach((player) => {
      console.log(playersFromStorage);
      var playerStat = document.createElement('p');
      var text = document.createTextNode(`${position}. ${player.name} - ${player.highScore}`);

      playerStat.appendChild(text);
      scoreList.appendChild(playerStat);
      position++;
    });
  }

  
}

// Add event listeners
clearScoresBtn.addEventListener('click', clearScores);
window.addEventListener('load', createHighScoreList);