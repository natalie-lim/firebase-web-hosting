# firebase-web-hosting
This is my personal [website](https://firstwebdevproject.web.app/) complete with several different controversial opinions, a mysterious adventure link, and a game called Flappy Teacher. In this game, you may choose your "bird" (i.e. one of the teachers in the Harvard-Westlake CS department) and play the classic arcade game flappy bird with them. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Acknowledgements](#acknowledgements)

#installation
Just click this [link] (https://firstwebdevproject.web.app/)

#features
There is a leadership board function that takes the initials (user input) and the users score in flappy teacher singleplayer mode, scoring it in a firebase database. The leadership board js then does the following:
* Initializes Firebase: It contains a hardcoded configuration object for Firebase, which it uses to initialize the Firebase application.
* Creates Firestore Reference: It sets up a reference to Firestore using the initialized Firebase app.
* Sets db Property: It sets the db property to the passed-in db argument
* Sets leaderboardRef Property: It defines leaderboardRef to point to the 'scores' collection in Firestore.
* Finds Scores List Element: It looks up an HTML element with the ID 'scores-list' and assigns it to scoresListElement.
* Loads Top Scores: It calls loadTopScores() method to fetch and display the top scores.
