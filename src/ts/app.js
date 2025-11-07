/* RULES BUTTON */
var rulesButton = document.querySelector('.rules-button');
var rulesContent = document.querySelector('.rules-container');
rulesButton.addEventListener('click', function () {
    rulesContent.classList.toggle('open');
});
/* CLOSE BUTTON */
var closeButton = document.querySelector('.close');
closeButton.addEventListener('click', function () {
    rulesContent.classList.remove('open');
});
/* SCORE */
var scoreNumber = document.getElementById('score-number');
var score = 0;
scoreNumber.innerHTML = score.toString();
function getComputerChoice() {
    var choices = ['rock', 'paper', 'scissors'];
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie";
    }
    var playerWins = (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper');
    setTimeout(function () {
        score += playerWins ? 2 : -1;
        scoreNumber.innerHTML = score.toString();
    }, 6000);
    return playerWins ? 'You win' : 'You lose';
}
/* GAME PAGE */
document.addEventListener('DOMContentLoaded', function () {
    var resultDiv = document.getElementById('result');
    var options = document.querySelectorAll('.option');
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            var playerChoice = option.id;
            var computerChoice = getComputerChoice();
            var result = determineWinner(playerChoice, computerChoice);
            var triangleDiv = document.querySelector('.triangle');
            triangleDiv.style.display = 'none';
            resultDiv.style.display = 'flex';
            resultDiv.innerHTML = "\n        <div class=\"result-container\">\n            <div>\n                <p class=\"picked\">You picked</p> \n                <div class=\"option bigger option--".concat(playerChoice, "\" id=\"").concat(playerChoice, "\">\n                    <img src=\"src/images/icon-").concat(playerChoice, ".svg\" alt=\"").concat(playerChoice, "\">\n                </div>\n            </div>\n            <div>\n                <p class=\"house-picked\">The house picked</p>\n                <div class=\"not-picked\"></div>\n            </div>\n        </div>\n    ");
            setTimeout(function () {
                resultDiv.innerHTML = "\n        <div class=\"result-container\">\n            <div>\n                <p class=\"picked\">You picked</p> \n                <div class=\"option bigger option--".concat(playerChoice, "\" id=\"").concat(playerChoice, "\">\n                    <img src=\"src/images/icon-").concat(playerChoice, ".svg\" alt=\"").concat(playerChoice, "\">\n                </div>\n            </div>\n            <div>\n                <p class=\"house-picked\">The house picked</p>\n                <div class=\"option bigger option--").concat(computerChoice, "\" id=\"").concat(computerChoice, "\">\n                    <img src=\"src/images/icon-").concat(computerChoice, ".svg\" alt=\"").concat(computerChoice, "\">\n                </div>\n            </div>\n        </div>\n    ");
            }, 3000);
            setTimeout(function () {
                resultDiv.innerHTML = "\n            <div class=\"result-container\">\n                <div>\n                    <p class=\"picked\">You picked</p> \n                    <div class=\"option bigger option--".concat(playerChoice, "\" id=\"").concat(playerChoice, "\">\n                        <img src=\"src/images/icon-").concat(playerChoice, ".svg\" alt=\"").concat(playerChoice, "\">\n                    </div>\n                </div>\n                <div class=\"result-message\">\n                    <h2 class=\"result-title\">").concat(result, "</h2>\n                    <button class=\"play-again\">Play Again</button>\n                </div>\n                <div>\n                    <p class=\"house-picked\">The house picked</p>\n                    <div class=\"option bigger option--").concat(computerChoice, "\" id=\"").concat(computerChoice, "\">\n                        <img src=\"src/images/icon-").concat(computerChoice, ".svg\" alt=\"").concat(computerChoice, "\">\n                    </div>\n                </div>\n            </div>\n    ");
                var winnerId = result === 'You win' ? playerChoice : computerChoice;
                var winnerDiv = document.getElementById(winnerId);
                if (winnerDiv)
                    winnerDiv.classList.add('winner');
                var playAgainButton = resultDiv.querySelector('.play-again');
                playAgainButton.addEventListener('click', function () {
                    resultDiv.style.display = 'none';
                    triangleDiv.style.display = 'flex';
                });
            }, 6000);
        });
    });
});
