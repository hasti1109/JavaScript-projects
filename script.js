document.getElementById('autoBtn').addEventListener('click', function() {
  this.classList.toggle('clicked');
});

document.querySelector('.js-reset').addEventListener('click', () => {
  roundsPlayed=0;
  score.wins=0;
  score.ties=0;
  score.losses=0;
  updateScore();
  clearInterval(intervalId);
  isAutoPlaying = false;
  document.querySelector('.js-move').innerHTML=' ';
  document.querySelector('.js-outcome').innerHTML=' ';
  document.querySelector('.js-rounds').innerHTML=' ';
  document.querySelector('.final-result').innerHTML=' ';
});


let score =  {
  wins: 0,
  losses: 0,
  ties: 0
};

let roundsPlayed = 0; 
updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if (!isAutoPlaying){
      intervalId = setInterval( () => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } 
  
  else{
      clearInterval(intervalId);
      isAutoPlaying = false;
  }
  
}

function playGame(playerMove) {
  if (roundsPlayed >= 10) {
    determineWinner();
    return;
  }

  const compMove = pickCompMove();
  let result = '';

  if (compMove === playerMove) {
    result='Tie'
    score.ties += 1;
  } 
  else if (
    (playerMove === 'Scissors' && compMove === 'Paper') ||
    (playerMove === 'Rock' && compMove === 'Scissors') ||
    (playerMove === 'Paper' && compMove === 'Rock')
    ) {
      result = 'Win';
      score.wins += 1;
  } 
  else {
    result = 'Loss';
    score.losses += 1;
  }
  
  updateScore();
  roundsPlayed += 1; 

  document.querySelector(".js-outcome").innerHTML = result;
  document.querySelector(".js-rounds").innerHTML = `Remaining Rounds : ${10-roundsPlayed}`;
  document.querySelector(".js-move").innerHTML = `You : <img class="move-icon2" src="images/${playerMove}-emoji.png">  <img class="move-icon2" src="images/${compMove}-emoji.png"> : Computer`;

  if (roundsPlayed >= 10) {
    determineWinner();
  }
}

function determineWinner() {
  let winner = 'Tie.';
  if (score.wins > score.losses) {
    winner = 'You Win.';
  } else if (score.losses > score.wins) {
    winner = 'You Lose.';
  }

  document.querySelector(".final-result").innerHTML = `Final Result: ${winner}`;
}

function pickCompMove() {
  let compMove = '';
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    compMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    compMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    compMove = 'Scissors';
  }

  return compMove;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `<table>
  <tr>
    <th>Player</th>
    <th>Computer</th>
    <th>Ties</th>
  </tr>
  <tr>
    <th>${score.wins}</th>
    <th>${score.losses}</th>
    <th>${score.ties}</th>
  </tr>
</table>`;
}

