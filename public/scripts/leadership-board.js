const firebaseConfig = {
  apiKey: "AIzaSyDVWLI_9t7OC_v1JAI1OaOn6dOiqDrFInQ",
  authDomain: "firstwebdevproject.firebaseapp.com",
  projectId: "firstwebdevproject",
  storageBucket: "firstwebdevproject.appspot.com",
  messagingSenderId: "765441582697",
  appId: "1:765441582697:web:0cb1dbaf2c6df1780464f8",
  measurementId: "G-PBXPC1531S"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
this.db = app.firestore(app);
const leaderboard = {};

document.addEventListener('DOMContentLoaded', () => {
    populateLeaderboard();
  });
  
function populateLeaderboard() {
    // Add functionality to fetch and display scores from the Firebase database
    // For now, we'll use dummy data
  getScores();
}
  
  function goToHomePage() {
    window.location.href = 'game-index.html';
  }
  
   function getScores() {
    const leaderboard = {};

    db.collection("scores").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = doc.id;
      leaderboard[userId] = {
        username: data.username, // Assume 'username' is the field name in your Firestore documents
        score: data.score // Assume 'score' is the field name in your Firestore documents
      };
    });

  // Convert the hashmap to an array of objects
    const leaderboardArray = Object.keys(leaderboard).map((userId) => {
      return {
        userId: userId,
        username: leaderboard[userId].username,
        score: leaderboard[userId].score
      };
    });

    // Sort the array based on scores from highest to lowest
    leaderboardArray.sort((a, b) => b.score - a.score);

    // Now, leaderboardArray is sorted by scores in descending order, with usernames preserved
    console.log('Sorted Leaderboard:', leaderboardArray);
  });

  }