/*
Class to handle fetching, storing, 
updating and sorting a highscore list.
*/

export class HighScore {
    static highScoreMax = 10; //max number of entries in the list.
    static highScores = 'highScores';
    static highScoreArray;


    static addScoreToHighScore(score) {

        // check if score to be submitted is at least higher
        // than the current lowest score in the Highscore list.
        if (HighScore.isScoreValid(score)) {

            // prompt the player for a name.
            const playerName = window.prompt("Please enter a name");

            // If player does not enter name, give a default name
            if (playerName === "") {
                playerName = "Unnamed";
            }

            // Create object to save name and score in the highscore array.
            const newScore = { score, playerName };
            const highScores = HighScore.highScoreArray;
            highScores.push(newScore);


            HighScore.sortHighscores(highScores);

            // Remove last entry in the highscore array.
            highScores.splice((HighScore.highScoreMax));


            HighScore.saveHighScoreToLocalStorage(highScores)
        }
    }

    // Sort highscores from highest to lowest.
    static sortHighscores(highScores) {
        highScores.sort((a, b) => b.score - a.score);
    }

    // Save highscore list back local storage.
    static saveHighScoreToLocalStorage(highScores) {
        localStorage.setItem(HighScore.highScores, JSON.stringify(highScores));
    }

    // Check if score is large enough to enter into highscore.
    static isScoreValid(score) {
        const highScores = HighScore.retrieveHighscores()
        const lowestScore = HighScore.getLowestScore(highScores);

        return score > lowestScore;
    }
    // Get the lowest score on the list, if there are less entries than highScoreMax, return 0;
    static getLowestScore(highScores) {
        return highScores[HighScore.highScoreMax - 1]?.score ?? 0;
    }

    // Get highscores from local storage, or empty array if there are no entries yet.
    static retrieveHighscores() {
        const highScores = JSON.parse(localStorage.getItem(HighScore.highScores)) ?? [];
        HighScore.highScoreArray = highScores;
        return highScores;
    }
}