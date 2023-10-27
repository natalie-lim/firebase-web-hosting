
class GameIndex {
  constructor() {
    this.canvas = document.getElementById('backgroundCanvas');
    this.startButton = document.getElementById('startButton');
    this.ctx = this.canvas.getContext('2d');
    this.images = ['kaufman.png', 'lopez.png', 'stout.png', 'theiss.png', 'varney.png']; // Add your image filenames here
    this.currentImageIndex = 0;
    this.startImageCycle();
    this.init();
    this.addEventListeners();
  }
  drawBackground() {
    this.ctx.fillStyle = '#ADD8E6'; // Set to your desired background color
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  singleplayer() {
    window.location.href = 'singleplayer-index.html'; // Redirect to your game's HTML file
  }

  startMulti() {
    window.location.href = 'multiplayer-index.html'; // Redirect to your game's HTML file
  }

  startImageCycle() {
    setInterval(() => this.cycleImages(), 800);
  }

  cycleImages() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    document.getElementById('gameImage').src = 'images/' + this.images[this.currentImageIndex];
  }

  addEventListeners() {
    document.getElementById('singleplayer').addEventListener('click', this.singleplayer.bind(this));
    document.getElementById('multiplayer').addEventListener('click', this.startMulti.bind(this));
  }

  init() {
    this.drawBackground();
    document.getElementById('gameImage').src = this.images[this.currentImageIndex]; // Initialize with the first image
  }
}
const gameIndex = new GameIndex();