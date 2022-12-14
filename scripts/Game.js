//GAME LOGIC

class Game{
    constructor(){
        this.playerName;
        this.shipName;
        this.player;
        this.aliens = this.spawnAliens();
        this.state = 'player name';
        this.choices = ['attack','sing','missile','retreat','inspect']
    }
    update(input){
        switch(this.state){
            case "player name":
                this.getPlayerName(input);
                break;
            case "ship name":
                this.getPlayerShipName(input);
                break;
            case "intro":
                this.intro();
                break;
            case "choose action":
                this.chooseAction(input);
                break;
            case "select song":
                this.selectSong(input);
                break;
            case "select target":
                this.selectTarget(input);
                break;
            case "play again":
                this.playAgain(input);
                break;
            case "pester":
                this.pester(input);
                break;
            default:
                console.log('God kill me please');
                break;
        }
    }

    start(){
        this.player = Object.create(null);
        this.aliens = this.spawnAliens();
        clearDisplay();
        clearStatus();
        displayMessage(`What is your name?`);
    }

    getPlayerName(input){
        this.playerName = input;
        // BEGIN NEXT STATE
        this.state = 'ship name';
        displayMessage(`What is your dream car?`);
    }

    getPlayerShipName(input){
        this.shipName = input;
        // BEGIN NEXT STATE
        this.state = 'intro';
        this.update();
    }

    intro(){
        this.player = new Player(this.playerName, this.shipName);
        displayIntro(this.player);
        displayStatus(this.player);
        // BEGIN NEXT STATE
        displayMessage(`${this.aliens.length} aliens are approaching, and they look very hungry!`);
        this.state = 'choose action';
        this.getActions();
    }

    // getNextAlien(){
    //     displayMessage(`${this.aliens.length} aliens remain!`);
    //     displayMessage(`${this.aliens[0].name} approaches!  What will you do?`);
    //     displayChoices(this.choices);
    // }

    getActions(){
        displayChoices(this.choices);
    }

    chooseAction(input){
        let sing = false;
        switch(input){
            case 'a':
            case 'attack':
                this.player.attack = 'laser';
                break;
            case 'm':
            case 'missile':
                if(this.player.missiles <= 0){
                    displayMessage(`Need more missiles!!!`);
                    displayChoices(['attack','missile','retreat']);
                    return;
                }
                this.player.attack = 'missile';
                break;
            case 's':
            case 'sing':
                this.player.attack = 'sing';
                sing = true;
                break;
            case 'r':
            case 'retreat':
                return this.gameOver(true);
            case 'i':
            case 'inspect':
                this.player.attack = 'inspect';
                break;
            default:
                return displayError(this.choices);
        }
        //BEGIN NEXT STATE
        console.log(this.state);
        this.state = sing ? 'select song' : 'select target';
        this.state === 'select target' ? this.getTargets() : this.getSong();
    }

    getSong(){
        //Display a message
        displayMessage(`Select a Song: `)
        //Display viable options
        displaySongs(this.player.Songs);
    }

    selectSong(input){
        this.player.song = '';
        switch (input){
            case 'a':
            case 'arena ballad':
                this.player.song = 'arena ballad';
                break;
            case 's':
            case 'somber waltz':
                this.player.song = 'somber waltz';
                break;
            case 'd':
            case 'dark serenade':
                this.player.song = 'dark serenade';
                break;
            default:
                return displayError(this.player.Songs);
        }
        if(this.player.song){
            //BEGIN NEXT STATE
            this.state = 'select target';
            this.getTargets();
        }
    }

    getTargets(){
        displayMessage(`Select a Target: `);
        displayTargets(this.aliens);
    }

    selectTarget(input){
        let target;
        //determine if our input is a single character or not.
        if(input.length === 1){
            target = this.aliens.find((alien) => {
                const firstChar = getFirstLetter(alien.name);
                return input === firstChar;
            })
        } else {
            target = this.aliens.find((alien) => input === alien.name)
        }
        if(target){
            //BEGIN NEXT STATE
            this.state = 'choose action';
            this.getResults(target);
        } else {
            const alienNames = this.aliens.map(alien => alien.name);
            displayError(alienNames);
        }
    }

    getResults(target){
        // Inspection only relays info to the player about a target alien.
        if(this.player.attack === 'inspect') return inspect(target);

        //commence battle
        battle(this, target);
        //CLEAN UP
        //remove dead + fled aliens
        const current = this.aliens.length;
        this.aliens = this.aliens.filter((alien)=>alien.status === 'active');
        //check if the player is still alive
        if(isAlive(this.player)){
            //If you killed the current alien
            if(current > this.aliens.length){
                //If more aliens remain
                if(this.aliens.length > 0){
                    displayMessage(`${this.aliens.length} aliens remain!`);
                    displayChoices(this.choices);
                } else {
                    //VICTORY
                    displayMessage(`You have defeated the alien menace!`);
                    displayWin(this.player);
                    //BEGIN NEXT STATE
                    this.state = 'play again';
                    displayMessage(`Another wave of aliens appears on the horizon!`);
                    displayPlayAgain();
                }
            } else {
                displayChoices(this.choices);
            }
        } else {
            this.gameOver();
        }
        displayStatus(this.player);
    }

    gameOver(retreat = false){
        if(retreat){
            //RETREAT
            //Display RETREAT Message
            displayMessage(`Pathetic...`);
            displayRetreat(this.player);
        } else {
            //DEFEAT
            //Display DEFEAT Message
            displayMessage(`The ${this.player.ship} plummeted to the Earth in a dazzling crimson ball of smoke and fire!`)
            displayLoss(this.player);
        }
        //BEGIN NEXT STATE
        this.state = 'play again';
        displayPlayAgain(true);
    }

    playAgain(input){
        //Reset the game
        switch(input){
            case 'y':
            case 'yes':
                this.state = 'player name';
                this.start();
                break;
            case 'n':
            case 'no':
                this.state = 'pester';
                this.pester('y');
                break;
            default:
                displayError(['yes','no']);
                break;
        }
    }

    pester(input){
        switch(input){
            case 'y':
            case 'yes':
                const messages = [
                    `Do you really have something better to do?`,
                    `No <strong>SPAM</strong> for you?`,
                    `Just one more minute!`
                ]
                const message = messages[Math.floor(Math.random() * messages.length)];
                displayMessage(message);
                displayMessage(`Are you sure you want to quit?`);
                displayMessage(`(Y)es / (N)o`);
                break;
            case 'n':
            case 'no':
                //Reset the game
                this.state = 'player name';
                this.start();
                break;
            default:
                displayError(['yes','no']);
                break;
        }
    }

    spawnAliens(){
        const aliens = [];
        const max = 12, min = 6;
        const limit = Math.floor(Math.random() * (max - min + 1) + min);
        const validateName = (alien) => {
            //Check to make sure that no other alien has this name
            if(aliens.some(element => element.name === alien.name)){
                alien.name = alien.setName();
                return validateName(alien);
            }
            return alien;
        }
        for(let i = 0; i < limit; i++){
            const alien = validateName(new Alien());
            aliens.push(alien);
        }
        return aliens;
    }
}