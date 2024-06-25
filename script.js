// Array of possible hands for the game
const hands = ['rock', 'paper', 'scissors'];

// Function to get a random hand from the array
function getHand() {
    return hands[Math.floor(Math.random() * hands.length)];
}

// Player objects with names and a method to get a hand
const player1 = { name: 'Player 1', getHand: getHand };
const player2 = { name: 'Player 2', getHand: getHand };
const player3 = { name: 'Player 3', getHand: getHand };
const player4 = { name: 'Player 4', getHand: getHand };

// Function to play a single round between two players
function playRound(player1, player2, roundNumber, scores) {
    const hand1 = player1.getHand();
    const hand2 = player2.getHand();
    let winner = null;

    // Determine winner based on hands played
    if (hand1 === hand2) {
        console.log(`${player1.name} played ${hand1} and ${player2.name} played ${hand2}. It's a tie!`);
    } else if (
        (hand1 === 'rock' && hand2 === 'scissors') ||
        (hand1 === 'paper' && hand2 === 'rock') ||
        (hand1 === 'scissors' && hand2 === 'paper')
    ) {
        console.log(`${player1.name} played ${hand1} and ${player2.name} played ${hand2}. ${player1.name} wins!`);
        winner = player1;
    } else {
        console.log(`${player1.name} played ${hand1} and ${player2.name} played ${hand2}. ${player2.name} wins!`);
        winner = player2;
    }

    // Update scores
    if (winner === player1) {
        scores[0]++;
    } else if (winner === player2) {
        scores[1]++;
    }

    // Display scores in UI
    const resultsList = document.getElementById('results-list');
    const roundResult = `${player1.name}: ${scores[0]} - ${player2.name}: ${scores[1]}`;
    const roundLi = document.createElement('li');
    roundLi.textContent = `Round ${roundNumber}: ${roundResult}`;
    resultsList.appendChild(roundLi);

    return winner;
}

// Function to play a game between two players until one player wins the specified score
function playGame(player1, player2, playUntil) {
    let score1 = 0;
    let score2 = 0;
    let roundNumber = 0;
    const scores = [0, 0];

    // Play rounds until one player reaches the specified score
    while (score1 < playUntil && score2 < playUntil) {
        roundNumber++;
        const winner = playRound(player1, player2, roundNumber, scores);
        if (winner === player1) {
            score1++;
        } else if (winner === player2) {
            score2++;
        }
    }

    // Return the player who reached the score limit first
    return score1 === playUntil ? player1 : player2;
}

// Function to play a tournament between four players
function playTournament(players, playUntil) {
    const winner1 = playGame(players[0], players[1], playUntil);
    const winner2 = playGame(players[2], players[3], playUntil);
    const tournamentWinner = playGame(winner1, winner2, playUntil);
    console.log(`${tournamentWinner.name} is the world champion`);
    return tournamentWinner;
}

// Function to start the tournament
function startTournament() {
    const players = [player1, player2, player3, player4];
    const playerList = document.getElementById('players-list');
    const resultsList = document.getElementById('results-list');
    playerList.innerHTML = '';  // Clear previous player list
    resultsList.innerHTML = ''; // Clear previous results

    // Add players to the UI
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;
        playerList.appendChild(li);
    });

    // Play the tournament and display the winner
    const tournamentWinner = playTournament(players, 3); // 3 is the score limit
    const winnerLi = document.createElement('li');
    winnerLi.textContent = `${tournamentWinner.name} is the world champion`;
    resultsList.appendChild(winnerLi);
}

// Event listener to start the tournament when the button is clicked
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startTournament);
});

