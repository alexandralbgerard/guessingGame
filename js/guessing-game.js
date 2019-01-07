/* eslint-disable complexity */
function generateWinningNumber () {
    return Math.ceil(Math.random() * 100);
}

function shuffle (array) {
    let m = array.length;

    // While there remain elements to shuffle…
    // While length remains...
    while (m) {
  
      // Pick a remaining element…
      let i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      let t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
}


class Game {
    constructor () {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference () {
        if (this.winningNumber > this.playersGuess) {
            return this.winningNumber - this.playersGuess;
        } else {
            return this.playersGuess - this.winningNumber;
        }
    }

    isLower () {
        if (this.playersGuess < this.winningNumber) return true;
        else return false;
    }

    // More Responsive isLower Code, but fails spec
    // {
    //     if (this.playersGuess < this.winningNumber){
    //         return `Get High!`;
    //     } else if (this.playersGuess > this.winningNumber){
    //         return `Get Low!`;
    //     } else {
    //         return '';
    //     }
    // }

    checkGuess (n) {
        try {
            throw n;
        } catch (num) {
            if (num > 100 || num < 1 || isNaN(num)) {
                throw 'That is an invalid guess.'
            }
        }
        // Win, Repeat Guess, Push to Past Guesses
        if (n === this.winningNumber) {
            return 'You Win!'
        } else if (this.pastGuesses.includes(n)) {
            return 'You have already guessed that number.'
        } else if (n !== this.winningNumber && !this.pastGuesses.includes(n)) {
            this.pastGuesses.push(n)
        }

        // More than 5 Guesses, You Lose
        if (this.pastGuesses.length >= 5) {
            return `You Lose.`;
            //The number was ${this.winningNumber}.`
        }

        // Less than 10 away
        if (this.difference() < 10) {
            return `You're burning up!`;
        } 
        // Less than 25 away
        if (this.difference() < 25) {
            return "You're lukewarm.";
        }
        // Less than 50 away
        if (this.difference() < 50) {
            return "You're a bit chilly.";
        }
        // Less than 100 away
        if (this.difference() < 100) {
            return "You're ice cold!";
        }

    }

    playersGuessSubmission (num) {
        this.playersGuess = num;
        return this.checkGuess(num);
    }

    provideHint(){
        let hint1 = generateWinningNumber();
        let hint2 = generateWinningNumber();
        let hintArray = [hint1, hint2, this.winningNumber];
    
        return shuffle(hintArray);
    }

}


// new game function

function newGame(){
    return new Game;
}



