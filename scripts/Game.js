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
        displayMessage(`${this.aliens[0].name} approaches!  What will you do?`);
        displayMessage(`(A)ttack / (R)etreat`)
    }

    chooseAction(input){
        switch(input){
            case 'a':
            case 'attack':
                //commence battle
                battle(this.player, this.aliens[0]);
                //check for victor
                if(isAlive(this.player)){
                    //remove the first element from the array
                    this.aliens.shift();
                    displayMessage(`Great work!  ${this.aliens.length} aliens remain!`);
                    if(this.aliens.length > 0){
                        this.getNextAlien();
                    } else {
                        //VICTORY
                        displayMessage(`You have defeated the alien menace!`);
                        displayMessage(victoryMessage);
                    }
                } else {
                    this.gameOver();
                }
                break;
            case 'r':
            case 'retreat':
                this.gameOver(true);
                break;
            default:
                const valid = ['a','attack','r','retreat'];
                displayError(valid);
        }
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
        for(let i = 0; i < 6; i++){
            aliens.push(new Alien());
        }
        return aliens;
    }
}