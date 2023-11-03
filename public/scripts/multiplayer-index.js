
class SinglePlayerIndex {
    constructor() {
      this.canvas = document.getElementById('backgroundCanvas');
      this.startButton = document.getElementById('startButton');
      this.ctx = this.canvas.getContext('2d');
      this.images = ['kaufman.png', 'lopez.png', 'stout.png', 'theiss.png', 'varney.png']; // Add your image filenames here
      this.currentImageIndex1 = 0;
      this.currentImageIndex2 = 0;
      this.init();
      this.addEventListeners();
    }
    drawBackground() {
      this.ctx.fillStyle = '#ADD8E6'; // Set to your desired background color
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startGameMulti() {
      window.location.href = 'multiplayer.html'; // Redirect to your game's HTML file
    }
  
    cycleImages1() {
      this.currentImageIndex1 = (this.currentImageIndex1 + 1) % this.images.length;
      document.getElementById('gameImage1').src = 'images/' + this.images[this.currentImageIndex1];
      localStorage.setItem('currentImagePath1', this.images[this.currentImageIndex1]);
    }
    cycleImages2() {
      this.currentImageIndex2 = (this.currentImageIndex2 + 1) % this.images.length;
      document.getElementById('gameImage2').src = 'images/' + this.images[this.currentImageIndex2];
      localStorage.setItem('currentImagePath2', this.images[this.currentImageIndex2]);
    }
  
    addEventListeners() {
      document.getElementById('cycleButton1').addEventListener('click', this.cycleImages1.bind(this));
      document.getElementById('cycleButton2').addEventListener('click', this.cycleImages2.bind(this));
      document.getElementById('startGameMulti').addEventListener('click', this.startGameMulti.bind(this));
    }
  
    init() {
      this.drawBackground();
      document.getElementById('gameImage1').src = ("images/" + this.images[this.currentImageIndex1]); 
      document.getElementById('gameImage2').src = ("images/" + this.images[this.currentImageIndex2]);
      localStorage.setItem('currentImagePath1', this.images[this.currentImageIndex1]);
      localStorage.setItem('currentImagePath2', this.images[this.currentImageIndex2]);
    }
  }
  const gameIndex = new SinglePlayerIndex();