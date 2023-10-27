const canvas1 = document.getElementById('gameCanvas1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('gameCanvas2');
const ctx2 = canvas2.getContext('2d');

const columns1 = [];
const columns2 = [];
const columnWidth = 40;
const gapHeight = 250;
const columnInterval = 300;

let scorePlayer1 = 0;
let scorePlayer2 = 0;

const background = {
  image: new Image(),
  x: 0,
  speed: 0.5,
};

background.image.src = 'images/background-image.png'

function drawBackground(canvas, ctx) {
  ctx.drawImage(background.image, background.x, 0, canvas.width, canvas.height);
  ctx.drawImage(background.image, background.x + canvas.width, 0, canvas.width, canvas.height);
}

function updateBackground(canvas) {
  background.x -= background.speed;
  if (background.x < -canvas.width) background.x = 0;
}

const player1 = {
    dy: 0,
    x: 100,
    y: 100,
    width: 30,
    height: 60,
    gravity: 0.4,
    onGround: false,
    jumpStrength: 10,
    image: new Image(),
};

const player2 = {
    dy: 0,
    x: 100,
    y: 100,
    width: 30,
    height: 60,
    gravity: 0.4,
    onGround: false,
    jumpStrength: 10,
    image: new Image(),
};
const currentImagePath1 = "images/" + localStorage.getItem('currentImagePath1');
const currentImagePath2 = "images/" + localStorage.getItem('currentImagePath2');
player1.image.src = currentImagePath1;
player2.image.src = currentImagePath2;

function drawPlayer(ctx, player) {
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function applyGravity(player) {
    player.dy += player.gravity;
    player.y += player.dy;
    
    if (player.y + player.height > canvas1.height) {
        player.y = canvas1.height - player.height;
        player.dy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
    
    // Ensure player stays within the top boundary
    if (player.y < 0) {
        player.y = 0;
        player.dy = 0;
    }
}


function jump(player) {
    player.dy = -player.jumpStrength;
    player.onGround = false;
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyW') { // W key for Player 1
        jump(player1);
    } else if (e.code === 'ArrowUp') { // Up arrow key for Player 2
        jump(player2);
    }
});

function addColumnPair(canvas, columns) {
    const gapPosition = Math.random() * (canvas.height - gapHeight);
    columns.push({
      x: canvas.width,
      y: 0,
      width: columnWidth,
      height: gapPosition, // Top column
      passed: false,
      type: 'top'
    });
    columns.push({
      x: canvas.width,
      y: gapPosition + gapHeight,
      width: columnWidth,
      height: canvas.height - gapPosition - gapHeight, // Bottom column
      passed: false,
      type: 'bottom'
    });
  }
  function checkCollision(player, column) {
    return (
      player.x < column.x + column.width &&
      player.x + player.width > column.x &&
      player.y < column.y + column.height &&
      player.y + player.height > column.y
    );
  }
  
  function drawColumns(ctx, columns) {
    ctx.fillStyle = 'green'; // Set to your desired column color
    columns.forEach(column => {
      ctx.fillRect(column.x, column.y, column.width, column.height);
    });
  }
  
  function updateColumns(columns, player, playernNumber) {
    for (let i = columns.length - 1; i >= 0; i--) {
      const column = columns[i];
      column.x -= 2; // Adjust the speed as necessary
  
      // Check for collision with player
      if (checkCollision(player, column)) {
        localStorage.setItem('loser', playernNumber);
        window.location.href = 'game-over-2.html'; // Redirect to the game over page
        return; // Exit the function to prevent further updates after the collision
      }

      if (!column.passed && player.x > column.x + columnWidth) {
        column.passed = true;
        if (playernNumber === 'player1') {
          scorePlayer1++;
          console.log("Score:", score);
        } else if (playernNumber === 'player2') {
          scorePlayer2++;
        }
      }
  
      // Remove off-screen columns
      if (column.x + column.width < 0) {
        columns.splice(i, 1);
      }
    }
  
    // Add new columns
    if (
      columns.length === 0 ||
      columns[columns.length - 1].x + columnWidth < canvas1.width - columnInterval
    ) {
      addColumnPair(canvas1, columns1);
      addColumnPair(canvas2, columns2);
    }
  }

  function drawScore(ctx, score) {
    setScoreStyle(ctx);
    const scoreText = 'Score: ' + score;
    const x = 10;
    const y = 20;
    ctx.strokeText(scoreText, x, y);
    ctx.fillText(scoreText, x, y);
  }
  function setScoreStyle(ctx) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = '#FFD700'; // gold color
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.lineHeight = 1;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
  }
  
  function gameLoop1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    updateBackground(canvas1);
    updateBackground(canvas2);
    drawBackground(canvas1, ctx1);
    drawBackground(canvas2, ctx2);
    drawPlayer(ctx1, player1);
    applyGravity(player1);
    drawColumns(ctx1, columns1);
    drawScore(ctx1, scorePlayer1);
    updateColumns(columns1, player1, 'player1');
    requestAnimationFrame(gameLoop1);
  }
  
  function gameLoop2() {
    drawPlayer(ctx2, player2);
    applyGravity(player2);
    drawColumns(ctx2, columns2);
    drawScore(ctx2, scorePlayer2);
    updateColumns(columns2, player2, 'player2');
    requestAnimationFrame(gameLoop2);
  }
  
  // Initialize the first pair of columns
  addColumnPair(canvas1, columns1);
  addColumnPair(canvas2, columns2);
  
  gameLoop1();
  gameLoop2();