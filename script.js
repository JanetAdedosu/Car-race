const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.querySelector('.game-container');

let carPosition = 125; // Initial position of the car
let obstaclePosition = -100; // Initial position of the obstacle
let gameInterval;
let isGameOver = false;

// Move the car left and right
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && carPosition > 0) {
        carPosition -= 15; // Move left
    } else if (event.key === 'ArrowRight' && carPosition < 250) {
        carPosition += 15; // Move right
    }
    car.style.left = carPosition + 'px';
});

// Start the game
function startGame() {
    gameInterval = setInterval(() => {
        if (isGameOver) return;

        obstaclePosition += 5; // Move the obstacle down

        // Reset obstacle position if it goes off screen
        if (obstaclePosition > 600) {
            obstaclePosition = -100;
            obstacle.style.left = Math.random() * 250 + 'px'; // Randomize obstacle position
        }

        obstacle.style.top = obstaclePosition + 'px';

        // Check for collision
        if (obstaclePosition > 500 && obstaclePosition < 600 && 
            parseInt(obstacle.style.left) === carPosition) {
            clearInterval(gameInterval);
            alert('Game Over! Refresh to play again.');
            isGameOver = true;
        }
    }, 20);
}

// Start the game when the page loads
window.onload = startGame;