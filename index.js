function getRandomNum1To9() {
    return Math.floor((Math.random() * 9) + 1);
} 

const gamePattern = []
while (gamePattern.length < 5) {
    let num = getRandomNum1To9()
    if (gamePattern.includes(num) === false) {
        gamePattern.push(num)
    }
}

const messageDisplay = document.querySelector('#message');
messageDisplay.textContent = gamePattern.join(" ");

const buttonsDisplay = document.querySelector('#button-container');

const gameDisplay = document.querySelector('#game-container');


let wrongCounter = 0;
const wrongCounterDisplay = document.querySelector('#wrong-count')

const userPattern = [];
let currPatternIndex = 0;




function checkWin() {
    if (currPatternIndex === gamePattern.length) {
        clearInterval(timer);
        document.querySelectorAll('.num-btn').forEach(el => el.disabled = true);
        const winText = document.createElement('p');
        winText.classList.add('end-text')
        winText.textContent = 'You win :)';
        gameDisplay.appendChild(winText);
    } 
}

function checkLoss() {
    if (wrongCounter === 3 || timerStart === 0) {
        clearInterval(timer);
        document.querySelectorAll('.num-btn').forEach(el => el.disabled = true);
        const loseText = document.createElement('p');
        loseText.classList.add('end-text')
        loseText.textContent = 'You lose :(';
        gameDisplay.appendChild(loseText);
    }
}

function addUserInput(e) {
    const input = e.target.textContent;
    if (input == gamePattern[currPatternIndex]) {
        currPatternIndex++;
        userPattern.push(input);
        e.target.disabled = true;
        checkWin();

    } else {
        wrongCounter += 1;
        updateWrongCounter()
        checkLoss();

    }
}

function makeNumButtons() {
    buttonsDisplay.textContent = "";
    const btnNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 0; i < 9; i++) {
        let button = document.createElement('button')
        button.classList.add('num-btn');
        button.addEventListener('click', addUserInput)
        buttonsDisplay.appendChild(button)

        let randomIndex = Math.floor(Math.random() * btnNums.length)
        button.textContent = btnNums.splice(randomIndex, 1)

    }
}

function updateWrongCounter() {
    let countArr = []
    for (let i = 0; i < wrongCounter; i++) {
        countArr.push('❌')
    };
    wrongCounterDisplay.textContent = countArr.join(" ");
    return 
}

makeNumButtons()

let timerStart = 5;
function gameTimer() {
    if (timerStart === 0) {
        clearInterval(timer);
        checkLoss();
    } else {
        timerStart--;
        document.querySelector('#timer').textContent = timerStart;
    }

}

const timer = setInterval(gameTimer, 1000)