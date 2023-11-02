const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    dx: 0,
    dy: 0,
    bounces: 0
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();

    if (ball.x + ball.radius + ball.dx > canvas.width || ball.x - ball.radius + ball.dx < 0) {
        ball.dx = -ball.dx;
        ball.bounces++;
    }

    if (ball.y + ball.radius + ball.dy > canvas.height || ball.y - ball.radius + ball.dy < 0) {
        ball.dy = -ball.dy;
        ball.bounces++;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(update);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const angle = Math.atan2(clickY - ball.y, clickX - ball.x);
    ball.dx = Math.cos(angle) * ball.speed;
    ball.dy = Math.sin(angle) * ball.speed;
});

resetButton.addEventListener('click', () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 0;
    ball.dy = 0;
    ball.bounces = 0;
});

update();
