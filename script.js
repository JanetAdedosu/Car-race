// Get references to the car and game container
const car = document.querySelector('.car');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score'); // Reference to the score display

// Set initial position of the car
let carPosition = 275; // Centered in a 600px wide container (600/2 - 50/2)
let score = 0; // Initialize score

// Function to move the car left or right
function moveCar(event) {
    const key = event.key;

    // Move left
    if (key === 'ArrowLeft' && carPosition > 0) {
        carPosition -= 15; // Move left by 15px
    }
    // Move right
    else if (key === 'ArrowRight' && carPosition < 550) { // 600 - 50 (car width)
        carPosition += 15; // Move right by 15px
    }

    // Update car position
    car.style.left = carPosition + 'px';
}

// Function to create obstacles
//create new obstacles element and position them along the width
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px'; // Random horizontal position
    gameContainer.appendChild(obstacle);

    // Move the obstacle down
    let obstaclePosition = -100; // Start above the view
    //set interval to move obstacle down the screen
    const obstacleInterval = setInterval(() => {
        obstaclePosition += 5; // Move down by 5px
        obstacle.style.top = obstaclePosition + 'px';

        // Check for collision with the car
        if (obstaclePosition > 600) {
            clearInterval(obstacleInterval);
            gameContainer.removeChild(obstacle); // Remove obstacle when it goes out of view
            score += 1; // Increase score when an obstacle passes
            scoreDisplay.textContent = 'Score: ' + score; // Update score display
        }

        // Collision detection
        if (obstaclePosition + 100 >= 600 && 
            parseInt(obstacle.style.left) < carPosition + 50 && 
            parseInt(obstacle.style.left) + 50 > carPosition) {
            alert('Game Over!'); // Simple game over alert
            clearInterval(obstacleInterval);
            gameContainer.removeChild(obstacle); // Remove obstacle on collision
            
        }
    }, 100); // Move every 100ms
}

// Event listener for key presses
document.addEventListener('keydown', moveCar);

// Create obstacles at intervals
setInterval(createObstacle, 2000); // Create a new obstacle every 2 seconds