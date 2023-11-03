
class Leaderboard {
  constructor(db) {
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
    this.db = db;
    this.leaderboardRef = this.db.collection('scores');
    this.scoresListElement = document.getElementById('scores-list');
    this.loadTopScores();
    this.addEventListeners();
    this.init();
  }

  async loadTopScores() {
    this.scoresListElement.innerHTML = ''; // Clear existing list
    try {
      const querySnapshot = await this.leaderboardRef.orderBy('score', 'desc').limit(10).get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const scoreItem = document.createElement('li');
        scoreItem.classList.add('score-item');
        scoreItem.textContent = `${data.user}: ${data.score}`;
        this.scoresListElement.appendChild(scoreItem);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
  goHome() {
    // Redirect to the game page or home page
    window.location.href = 'game-index.html'; // or your game's HTML file
}
  addEventListeners() {
    document.getElementById('go-home').addEventListener('click', this.goHome.bind(this));
}
}

document.getElementById('refresh-scores').addEventListener('click', () => {
  const leaderboard = new Leaderboard(firebase.firestore());
});
const leaderboard = new Leaderboard();