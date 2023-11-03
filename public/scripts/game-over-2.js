
class GameOver{
    constructor(){
        this.addEventListeners();
        this.init();
    }
    retryGame() {
        // Redirect to the game page or home page
        window.location.href = 'game-index.html'; // or your game's HTML file
    }
    addEventListeners() {
        document.getElementById('try-again').addEventListener('click', this.retryGame.bind(this));
        document.addEventListener('DOMContentLoaded', this.setVars.bind(this));
    }
    
    setVars() {
        const score = localStorage.getItem('score') || '0';
        document.getElementById('score').textContent = score;
        const loser = localStorage.getItem('loser') || '0';
        document.getElementById('loser').textContent = "The loser is " + loser + "!";
    }
}
const gameOver = new GameOver();