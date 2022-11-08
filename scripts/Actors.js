class Player{
    constructor(name, ship){
        this.hullMax = 20;
        this.hull = this.hullMax;
        this.firepower = 5;
        this.accuracy = 0.7;
        this.name = name ? name : "MYBUTT";
        this.ship = ship ? ship : "Delorean";
    }
}

class Alien{
    constructor(name = "The Alien"){
        this.hullMax = this.setHull();
        this.hull = this.hullMax;
        this.firepower = this.setFirepower();
        this.accuracy = this.setAccuracy();
        this.name = this.setName();
    }
    //Get a random value between 3 and 6
    setHull(){
        return Math.floor(Math.random() * (6 - 3 + 1) + 3);
    }
    //Get a random value between 2 and 4
    setFirepower(){
        return Math.floor(Math.random() * (4 - 2 + 1) + 2);
    }
    //Get a random value between 6 and 8
    setAccuracy(){
        return Math.floor(Math.random() * (8 - 6 + 1) + 6) * 0.1;
    }
    //Get a random name
    setName(){
        return this.nameList[Math.floor(Math.random() * this.nameList.length)];
    }
}

Alien.prototype.nameList = [
    'Karen',
    'Kyle',
    'Chad',
    'Chaz',
    'Grayson',
    'Zayden',
    'Bryson',
    'Professor Pumpkin Spice',
    'Spam Enthusiast',
    'Spam Addict',
    'Madison',
    'Bentley',
    'Hunter',
    'Mackenzie',
    'Mary Sue Ellen',
    'Zorthos',
    'Yawgmaw',
    'Dr Sprinkles',
    'Powdered Spam Man'
];

//ATTACK + LOG RESULT

const attack = (attacker, target) => {
    // have this shit go down... and return a result string detailing the outcome of the battle.
    //Take the attackers accuracy and see if they hit.
    //If the attacker hits!
    if(Math.random() <= attacker.accuracy){
        //Reduce the Targets Hull by the Attackers Firepower
        target.hull -= attacker.firepower;
        return `${attacker.name} fires it's lasers, dealing ${attacker.firepower} damage to ${target.name}!`;
    } else {
        return `${attacker.name} fires it's lasers at ${target.name} but missed!`;
    }
}

//CHECK STATUS

const isAlive = (actor) => {
    return actor.hull > 0;
}

//BATTLE LOOP

const battle = (player, alien) => {
    while(isAlive(player) && isAlive(alien)){
        //Player attacks the alien
        displayMessage(attack(player,alien));
        //If the alien survives, it will attack the player
        if(isAlive(alien)){
            displayMessage(attack(alien,player));
            displayStatus(player);
        }
    }
    //If the alien dies...
    if(!isAlive(alien)){
        //display Victory Message
        displayMessage(`${player.name} has defeated ${alien.name}!`);
    }
    //If the player dies...
    if(!isAlive(player)){
        //display DEFEAT Message
        displayMessage(`${player.name} was defeated by ${alien.name}`);
    }
}