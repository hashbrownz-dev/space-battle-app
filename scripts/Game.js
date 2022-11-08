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
            default:
                console.log('God kill me please');
                break;
        }
    }
    getNextAlien(){
        displayMessage(`${this.aliens[0].name} approaches!  What will you do?`);
    }
    getPlayerName(input){
        this.playerName = input;
        this.state = 'ship name';
        displayMessage(`What is your dream car?`);
    }
    getPlayerShipName(input){
        console.log('got the ship')
        this.shipName = input;
        this.state = 'intro';
        this.update();
    }
    intro(){
        this.player = new Player(this.playerName, this.shipName);
        displayIntro(this.player);
        this.getNextAlien();
        this.state = 'choose action';
    }
    chooseAction(input){

        //You choose to Attack
        if(input === 'a' || input === 'attack'){
            //display attack message
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
                    displayMessage(`You have defeated the alien menace!`);
                }
            } else {
                //GAME OVER
            }
        }
        //You choose to Retreat
        if(input === 'r' || input === 'retreat'){
            //GAME OVER
            //Display RETREAT Message
        }
    }
    start(){
        displayMessage(`What is your name?`);
    }
    spawnAliens(){
        const aliens = [];
        for(let i = 0; i < 6; i++){
            aliens.push(new Alien());
        }
        return aliens;
    }
    gameOver(){
        //Display the Defeat Message
    }
    playAgain(input){
        //Reset the game
    }
}