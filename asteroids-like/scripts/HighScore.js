export class HighScore {
    static highScoreMax = 10; //max number of entries in the list.
    static highScores = 'highScores';
    static highScoreArray;


    static addScoreToHighScore(score) {   
        if (HighScore.isScoreValid(score)) {
            const playerName = window.prompt("Enter a name to submit your score to the local highscore, leave blank to skip.");

            // If the player does not wish to submit their score, exit function without doing anything.
            if (playerName === "") {
                return;
            }
            // create object to save name and score in the highscore array 
            const newScore = { score, playerName };
            const highScores = HighScore.highScoreArray;
            highScores.push(newScore);

            // sort highscores from highest to lowest.
            HighScore.sortHighscores(highScores);

            highScores.splice((HighScore.highScoreMax));
            
            HighScore.saveHighScoreToLocalStorage(highScores)
        }
    }

    static sortHighscores(highScores) {
        highScores.sort((a, b) => b.score - a.score);
    }

    static saveHighScoreToLocalStorage(highScores) {
        localStorage.setItem(HighScore.highScores, JSON.stringify(highScores));
    }

    // Check if score is large enough to enter into highscore.
    static isScoreValid(score) {
        const highScores = HighScore.retrieveHighscores()
        const lowestScore = HighScore.getLowestScore(highScores);

        return score > lowestScore;
    }
    // get the lowest score on the list, if there are less entries than highScoreMax, return 0;
    static getLowestScore(highScores) {
        return highScores[HighScore.highScoreMax - 1]?.score ?? 0;
    }

    // get highscores from local storage, or empty array if there are no entries yet.
    static retrieveHighscores() {
        const highScores = JSON.parse(localStorage.getItem(HighScore.highScores)) ?? [];
        HighScore.highScoreArray = highScores;
        return highScores;
    }
}