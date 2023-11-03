class GameOver{
    constructor(){
        this.addEventListeners();
        const firebaseConfig = {
            apiKey: "AIzaSyDVWLI_9t7OC_v1JAI1OaOn6dOiqDrFInQ",
            authDomain: "firstwebdevproject.firebaseapp.com",
            projectId: "firstwebdevproject",
            storageBucket: "firstwebdevproject.appspot.com",
            messagingSenderId: "765441582697",
            appId: "1:765441582697:web:0cb1dbaf2c6df1780464f8",
            measurementId: "G-PBXPC1531S"
        };
        const app = firebase.initializeApp(firebaseConfig);
        this.db = app.firestore(app);
    }
    async init() {
        this.setVars();
        this.addEventListeners();
        await this.loadData();
    }
    
    retryGame() {
        // Redirect to the game page or home page
        window.location.href = 'game-index.html'; // or your game's HTML file
    }
    goToLeaderboard() {
        window.location.href = 'leadership-board.html'
    }
    addEventListeners() {
        document.getElementById('try-again').addEventListener('click', this.retryGame.bind(this));
        document.addEventListener('DOMContentLoaded', this.setVars.bind(this));
        document.getElementById('submit-score').addEventListener('click', () => this.handleSaveScore());
        document.getElementById('leaderboard').addEventListener('click', this.goToLeaderboard.bind(this));
    }
    saveScore(initials, score) {
        console.log("save score:  TODO grab userOrUserIP: " + initials + " " + score);
        this.db.collection("scores").add({
            user: initials,
            score: score
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      }
    
    updateScoreList() {
        this.db.collection("scores").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().score}`);
            });
        });    
    }
    
    setVars() {
        const score = localStorage.getItem('score') || '0';
        document.getElementById('score').textContent = score;
    }
    handleSaveScore() {
        const initialsInput = document.getElementById('initials');
        const initials = initialsInput.value;
        const score = localStorage.getItem('score') || '0';
        this.saveScore(initials, score);
    }

}
const gameOver = new GameOver();