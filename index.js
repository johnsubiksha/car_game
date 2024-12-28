const cars = document.querySelectorAll('.car');
const mycar = document.getElementById('mycar');
const endScreen = document.getElementById('end');
const restartButton = document.getElementById('restart-button');
const gameOvertext = document.getElementById('gameOvertext');


let movementchoice = [30, 150, 260, 370];
let myCarPosition = 50;
let gamespeed = 5;

let gameInterval;
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && myCarPosition > 50) {
        myCarPosition -= 110;
    } else if (event.key === 'ArrowRight' && myCarPosition < 300) {
        myCarPosition += 110;
    }
    mycar.style.left = `${myCarPosition}px`;
});

function startgame() {
   initializeCars();
    gameInterval = setInterval(() => {
        for (let i = 0; i < cars.length; i++) {
            moveObject(cars[i]);
        }
        checkCollision();
    }, 20);

    setInterval(() => {
        gamespeed += 0.1;
    }, 1000);
}


function initializeCars() {
    
    for (let i = 0; i < cars.length; i++) {
        setTimeout(() => {
            resetObject(cars[i]);
        }, i * 1000); // Delay of 1 second between each car
    }
}

function moveObject(object) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 550) {
        resetObject(object); // If object goes off the screen, reset it
        score++;
    } else {
        object.style.top = `${objectTop + gamespeed}px`;
    }
}

function resetObject(object) {
    object.style.top = '-50px'; // Start off screen at the top

    let availablePositions = [...movementchoice]; // Copy all positions
    // Check for currently occupied positions
    cars.forEach(car => {
        if (car !== object) { // Ignore the car being reset
            let otherCarLeft = parseInt(window.getComputedStyle(car).getPropertyValue('left'));
            availablePositions = availablePositions.filter(pos => pos !== otherCarLeft);
        }
    });

    // Randomly choose an available position
    if (availablePositions.length > 0) {
        let index = Math.floor(Math.random() * availablePositions.length);
        object.style.left = `${availablePositions[index]}px`;
    }
}

function checkCollision() {
    let mycarReact = mycar.getBoundingClientRect();
    for (let i = 0; i < cars.length; i++) {
        let carReact = cars[i].getBoundingClientRect();
        if (
            mycarReact.left < carReact.right &&
            mycarReact.right > carReact.left &&
            mycarReact.top < carReact.bottom &&
            mycarReact.bottom > carReact.top
        ) {
            clearInterval(gameInterval);
            showEndScreen();
        }
    }
}
function showEndScreen(){
    endScreen.style.display='block';
    gameOvertext.innerHTML =`Game Over!<br>Your Score: ${score}`;
}

restartButton.addEventListener('click', () => {
    window.location.reload(); // Restart the game
});

startgame();
