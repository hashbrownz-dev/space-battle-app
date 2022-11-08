//GAME LOGIC

class Game{
    constructor(){
        this.playerName;
        this.shipName;
        this.player;
        this.aliens = this.spawnAliens();
        this.state = 'player name';
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
        this.state = 'choose action';
        this.getNextAlien();
    }

    getNextAlien(){
        displayMessage(`${this.aliens.length} aliens remain!`);
        displayMessage(`${this.aliens[0].name} approaches!  What will you do?`);
        displayChoices(['attack','missile','retreat']);
    }

    chooseAction(input){
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
                console.log("Dooby dooby doo");
                break;
            case 'r':
            case 'retreat':
                return this.gameOver(true);
            default:
                const valid = ['a','attack','r','retreat'];
                displayError(valid);
        }
        //commence battle
        battle(this.player, this.aliens[0]);
        //CLEAN UP
        //remove dead + fled aliens
        const current = this.aliens.length;
        this.aliens = this.aliens.filter((alien)=>alien.status === 'active');
        //check if the player is still alive
        if(isAlive(this.player)){
            //If you killed the current alien
            if(current > this.aliens.length){
                displayMessage(`Great work!`);
                //If more aliens remain
                if(this.aliens.length > 0){
                    this.getNextAlien();
                } else {
                    //VICTORY
                    displayMessage(`You have defeated the alien menace!`);
                    displayMessage(victoryMessage);
                }
            } else {
                displayChoices(['attack','missile','retreat']);
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
            displayMessage(`The ${this.shipName} plummeted to the Earth in a dazzling crimson ball of smoke and fire!`)
            displayLoss(this.player);
        }
        //BEGIN NEXT STATE
        this.state = 'play again';
        displayPlayAgain();
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
                const valid = ['y','yes','n','no'];
                displayError(valid);
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
                const valid = ['y','yes','n','no'];
                displayError(valid);
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