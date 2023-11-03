const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;

function logCurrentImagePath() {
    const currentImagePath = GameIndex.getBird();
    console.log(currentImagePath);
    return currentImagePath;
}
  
const currentImagePath = "images/" + localStorage.getItem('currentImagePath');

const gapSize = 240;
const columnWidth = 50;
const minColumnHeight = 50;

const columns = [];

function addColumnPair() {
    const topColumnHeight = Math.random() * (canvas.height - gapSize - 2 * minColumnHeight) + minColumnHeight;
    columns.push({ x: canvas.width, y: 0, width: columnWidth, height: topColumnHeight, type: 'top', passed: false });
    columns.push({ x: canvas.width, y: topColumnHeight + gapSize, width: columnWidth, height: canvas.height, type: 'bottom', passed: false });
  }
  
addColumnPair();

const player = {
    x: 200,
    y: 50,
    width: 30,  // Set the width of the player image
    height: 60,  // Set the height of the player image
    dy: 0,
    gravity: 0.4, 
    jumpStrength: 10,
    onGround: false,
    image: new Image(),  
};

player.image.src = currentImagePath;

const background = {
    image: new Image(),
    x: 0,
    speed: 0.5,
};

background.image.src = 'images/background-image.png'; // Replace with the path to your background image

function drawPlayer() {
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function drawBackground() {
    ctx.drawImage(background.image, background.x, 0, canvas.width, canvas.height);
    ctx.drawImage(background.image, background.x + canvas.width, 0, canvas.width, canvas.height);
}

function updateBackground() {
    background.x -= background.speed;
    if (background.x < -canvas.width) background.x = 0;
}

function applyGravity() {
    player.dy += player.gravity;
    player.y += player.dy;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
}

function jump() {
    player.dy = -player.jumpStrength;
    player.onGround = false;
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jump();
    }
});

function drawColumns() {
    columns.forEach(column => {
      ctx.fillStyle = 'green'; // Set to your desired column color
      ctx.fillRect(column.x, column.y, column.width, column.height);
    });
}

function updateColumns() {
    for (let i = columns.length - 1; i >= 0; i--) {
        const column = columns[i];
        column.x -= 2; // Adjust the speed as necessary
        
        // Check for collision with player
        if (player.x < column.x + column.width &&
          player.x + player.width > column.x &&
          player.y < column.y + column.height &&
          player.y + player.height > column.y) {
            // Player hit the column
            localStorage.setItem('score', score);
            window.location.href = 'game-over.html'; // Redirect to the other HTML page
        }
    
        // Player passed the column
        if (!column.passed && player.x > column.x + column.width) {
          column.passed = true;
          if (column.type === 'top') {
            score++;
            console.log("Score:", score);
          }
        }
    
        // Remove off-screen columns
        if (column.x + column.width < 0) {
          columns.splice(i, 1);
        }

  // Add new columns
    const lastColumn = columns[columns.length - 1];
    if (canvas.width - lastColumn.x > 300) { // 300px from the previous column
        addColumnPair();
      }
    }
      
}

function setScoreStyle() {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = '#FFD700'; // gold color
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.lineHeight = 1;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
  }
  

function drawScore() {
    setScoreStyle();
    const scoreText = 'Score: ' + score;
    const x = 10;
    const y = 20;
    ctx.strokeText(scoreText, x, y);
    ctx.fillText(scoreText, x, y);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBackground();
    drawBackground();
    applyGravity();
    drawPlayer();
    updateColumns();
    drawColumns();
    drawScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
