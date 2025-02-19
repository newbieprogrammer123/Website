const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const unitSize = 20;
let snake = [{ x: unitSize * 5, y: unitSize * 5 }];
let direction = { x: 0, y: 0 };
let food = getRandomFoodPosition();
let score = 0;
let gameInterval = setInterval(gameLoop, 100);

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        clearInterval(gameInterval);
        return;
    }
    if (eatFood()) {
        score++;
        food = getRandomFoodPosition();
    }
    drawGame();
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * unitSize,
        y: snake[0].y + direction.y * unitSize
    };
    snake.unshift(newHead);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({ ...snake[snake.length - 1] });
        return true;
    }
    return false;
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    const y = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
    return { x, y };
}

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0 || key == "W" && direction.y === 0 || key == "w" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === "ArrowDown" && direction.y === 0 || key == "S" && direction.y === 0 || key == "s" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" && direction.x === 0 || key == "A" && direction.x === 0 || key == "a" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0 || key == "D" && direction.x === 0 || key == "d" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
    });
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, unitSize, unitSize);
}
