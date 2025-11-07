/* RULES BUTTON */
const rulesButton = document.querySelector('.rules-button') as HTMLButtonElement;

const rulesContent = document.querySelector('.rules-container') as HTMLDivElement;

rulesButton.addEventListener('click', () => {
    rulesContent.classList.toggle('open');
});

/* CLOSE BUTTON */
const closeButton = document.querySelector('.close') as HTMLButtonElement;

closeButton.addEventListener('click', () => {
    rulesContent.classList.remove('open');
});

/* SCORE */
const scoreNumber = document.getElementById('score-number') as HTMLSpanElement;
let score = 0;
scoreNumber.innerHTML = score.toString();

/* GAME FUNCTIONS */
type play = 'rock' | 'paper' | 'scissors';

function getComputerChoice(): play {
    const choices: play[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice: play, computerChoice: play): string {
    if (playerChoice === computerChoice) {
        return "It's a tie";
    }

    const playerWins =
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper');

    setTimeout(() => {
        score += playerWins ? 2 : -1;
        scoreNumber.innerHTML = score.toString();
    }, 6000);

    return playerWins ? 'You win' : 'You lose';
}

/* GAME PAGE */
document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const playerChoice = option.id as play;
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);
            const triangleDiv = document.querySelector('.triangle') as HTMLDivElement;

            triangleDiv.style.display = 'none';
            resultDiv.style.display = 'flex';

            resultDiv.innerHTML = `
        <div class="result-container">
            <div>
                <p class="picked">You picked</p> 
                <div class="option bigger option--${playerChoice}" id="${playerChoice}">
                    <img src="src/images/icon-${playerChoice}.svg" alt="${playerChoice}">
                </div>
            </div>
            <div>
                <p class="house-picked">The house picked</p>
                <div class="not-picked"></div>
            </div>
        </div>
    `;
            setTimeout(() => {
                resultDiv.innerHTML = `
        <div class="result-container">
            <div>
                <p class="picked">You picked</p> 
                <div class="option bigger option--${playerChoice}" id="${playerChoice}">
                    <img src="src/images/icon-${playerChoice}.svg" alt="${playerChoice}">
                </div>
            </div>
            <div>
                <p class="house-picked">The house picked</p>
                <div class="option bigger option--${computerChoice}" id="${computerChoice}">
                    <img src="src/images/icon-${computerChoice}.svg" alt="${computerChoice}">
                </div>
            </div>
        </div>
    `;
            }, 3000);

            setTimeout(() => {
                resultDiv.innerHTML = `
            <div class="result-container">
                <div>
                    <p class="picked">You picked</p> 
                    <div class="option bigger option--${playerChoice}" id="${playerChoice}">
                        <img src="src/images/icon-${playerChoice}.svg" alt="${playerChoice}">
                    </div>
                </div>
                <div class="result-message">
                    <h2 class="result-title">${result}</h2>
                    <button class="play-again">Play Again</button>
                </div>
                <div>
                    <p class="house-picked">The house picked</p>
                    <div class="option bigger option--${computerChoice}" id="${computerChoice}">
                        <img src="src/images/icon-${computerChoice}.svg" alt="${computerChoice}">
                    </div>
                </div>
            </div>
    `;
                const winnerId = result === 'You win' ? playerChoice : computerChoice;
                const winnerDiv = document.getElementById(winnerId);
                if (winnerDiv) winnerDiv.classList.add('winner');

                const playAgainButton = resultDiv.querySelector('.play-again') as HTMLButtonElement;
                playAgainButton.addEventListener('click', () => {
                    resultDiv.style.display = 'none';
                    triangleDiv.style.display = 'flex';
                });

            }, 6000);

        });
    });
});