class Player{
    constructor(name, ship){
        this.hullMax = 20;
        this.hull = this.hullMax;
        this.firepower = 5;
        this.accuracy = 0.7;
        this.missiles = 3;
        this.missileType = "standard";
        this.name = name ? name : "MYBUTT";
        this.ship = ship ? ship : "Delorean";
        //ATTACK property can be one of three values: laser, missile, song
        this.attack = "laser";
    }
}

class Alien{
    constructor(name = "The Alien"){
        this.hullMax = this.setHull();
        this.hull = this.hullMax;
        this.firepower = this.setFirepower();
        this.accuracy = this.setAccuracy();
        this.name = this.setName();
        this.status = 'active'; // three states: 'active', 'dead', 'fled'
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

//ATTACK handles the default attack of the ACTOR
const attack = (attacker, target) => {
    //Take the attackers accuracy and see if they hit.
    //If the attacker hits!
    if(Math.random() <= attacker.accuracy){
        //Reduce the Targets Hull by the Attackers Firepower
        target.hull -= attacker.firepower;
        return `${attacker.name} fired it's lasers, dealing ${attacker.firepower} damage to ${target.name}!`;
    } else {
        return `${attacker.name} fired it's lasers at ${target.name} but missed!`;
    }
}

//fireMissile handles the missile attack of the ACTOR
const fireMissile = (attacker, target, type) => {
    let accuracy, firepower;
    switch (type){
        case 'standard':
            accuracy = attacker.accuracy - 0.2;
            firepower = attacker.firepower * 2;
            break;
        case 'homing':
            accuracy = 1;
            firepower = attacker.firepower;
            break;
    }
    //Deduct Missile From Cache
    attacker.missiles--;
    if(Math.random() <= accuracy){
        target.hull -= firepower;
        return `${attacker.name} fired a ${type} missile, dealing ${firepower} damage to ${target.name}!`;
    } else {
        return `${attacker.name} fired a ${type} missile, but ${target.name} evaded the attack!`;
    }
}

//singSong handles the song action of the ACTOR

//CHECK STATUS

const isAlive = (actor) => {
    return actor.hull > 0;
}

//BATTLE LOOP

const battle = (player, alien) => {

    //the player attacks first
    //get player attack type

    switch(player.attack){
        case "laser":
            displayMessage(attack(player,alien));
            break;
        case "missile":
            displayMessage(fireMissile(player,alien,player.missileType));
            break;
        case "song":
            break;
        default:
            console.log(`Error: Could not determine player.attack. Value: ${player.attack}`);
            break;
    }

    //GET ATTACKERS
    const attackers = [];

    //IS THE CURRENT ALIEN ALIVE?
    if(alien.hull <= 0){
        alien.status = 'dead';
    }
    //WHAT IS THE CURRENT ALIENS STATUS?
    switch(alien.status){
        case 'active':
            attackers.push(alien);
            break;
        case 'fled':
            //DISPLAY RETREAT MESSAGE
            break;
        case 'dead':
            displayMessage(`${player.name} has defeated ${alien.name}!`);
            //GET BONUS
            break;
        default:
            console.log(`Error: Could not determine alien.status. Value: ${alien.status}`);
            break;
    }

    //the aliens attack next
    attackers.forEach((attacker) => {
        displayMessage(attack(attacker, player));
        displayStatus(player);
        if(!isAlive(player)){
            //display DEFEAT Message
            displayMessage(`${player.name} was defeated by ${attacker.name}`);
            //exit function
            return
        }
    })
}