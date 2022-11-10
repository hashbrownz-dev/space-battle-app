class Player{
    constructor(name, ship){
        this.hullMax = 20;
        this.hull = this.hullMax;
        this.firepower = 5;
        this.accuracy = 0.7;
        this.missiles = 3;
        this.missileType = "standard";
        this.name = name ? name : "mybutt";
        this.ship = ship ? ship : "delorean";
        //ATTACK property can be one of three values: laser, missile, song
        this.attack = "laser";
        //SONGS
        this.song;
    }
}

//PLAYER SET LIST

Player.prototype.Songs = [
    'arena ballad',
    'somber waltz',
    'dark serenade'
]

class Alien{
    constructor(){
        this.hullMax = this.setHull();
        this.hull = this.hullMax;
        this.firepower = this.setFirepower();
        this.accuracy = this.setAccuracy();
        this.name = this.setName();
        this.temperament = this.setTemperament();
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
    //Get a random temperament
    setTemperament(){
        return this.temperaments[Math.floor(Math.random() * this.temperaments.length)];
    }
}

Alien.prototype.nameList = [
    'karen',
    'kyle',
    'chad',
    'chaz',
    'grayson',
    'zayden',
    'bryson',
    'professor pumpkin spice',
    'spam enthusiast',
    'spam addict',
    'madison',
    'bentley',
    'hunter',
    'mackenzie',
    'mary sue ellen',
    'zorthos',
    'yawgmaw',
    'dr sprinkles',
    'powdered spam man'
];

Alien.prototype.temperaments = [
    'moody',
    'edgy',
    'happy',
    'neutral'
]

//ATTACK + LOG RESULT

//ATTACK handles the default attack of the ACTOR
const attack = (attacker, target) => {
    //Take the attackers accuracy and see if they hit.
    //If the attacker hits!
    if(Math.random() <= attacker.accuracy){
        //Reduce the Targets Hull by the Attackers Firepower
        target.hull -= attacker.firepower;
        return `${capitalize(attacker.name)} fired it's lasers, dealing ${attacker.firepower} damage to ${capitalize(target.name)}!`;
    } else {
        return `${capitalize(attacker.name)} fired it's lasers at ${capitalize(target.name)} but missed!`;
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
        return `${capitalize(attacker.name)} fired a ${capitalize(type)} missile, dealing ${firepower} damage to ${capitalize(target.name)}!`;
    } else {
        return `${capitalize(attacker.name)} fired a ${capitalize(type)} missile, but ${capitalize(target.name)} evaded the attack!`;
    }
}

//sing handles the sing 'attack' of the ACTOR
const sing = (attacker, target) => {

    switch (attacker.song){
        case 'arena ballad':
            return singArenaBallad(attacker, target);
        case 'somber waltz':
            return singSomberWaltz(attacker, target);
        case 'dark serenade':
            return singDarkSerenade(attacker, target);
    }
}

const singArenaBallad = (attacker, target) => {

    displayMessage(`${attacker.name} sang an uplifting song to ${target.name}.`);

    switch(target.temperament){

        case 'happy':
            //UPDATE STATS
            target.accuracy += 0.05;
            target.firepower += 1;
            console.log(target);
            //DISPLAY RESULT
            displayMessage(`${target.name}: I think I like this human music!  This tune really suits me!`);
            return `${target.name}'s accuracy rose by <strong class = 'increase'>5%</strong> and their firepower rose by <strong class = 'increase'>1</strong>!`;

        case 'moody':
            displayMessage(`${target.name}: What an awful song!  It really put me in a bad mood!`);
            return `${target.name} is feeling edgy!`

        case 'edgy':
            return `${target.name}: What a stupid song!  You're better off making spam ${attacker.name}!`;

        case 'neutral':
            if(Math.round(Math.random())) {
                target.temperament = 'happy';
                displayMessage(`${target.name}: I think I like this human music.  I'm feeling hyped!`);
                return `${target.name} is feeling happy!`
            }
            return `${attacker.name} song had no effect on ${target.name}!`
    }
}

const singSomberWaltz = (attacker, target) => {

    displayMessage(`${attacker.name} sang a depressing song to ${target.name}.`);

    switch(target.temperament){

        case 'happy':
            //UPDATE STATS
            target.temperament = 'edgy';

            //DISPLAY MESSAGE
            displayMessage(`${target.name}: What an awful song!  It really put me in a bad mood!`);
            return `${target.name} is feeling edgy!`

        case 'moody':
            if(Math.round(Math.random())){
                // UPDATE STATS
                target.status = 'fled';

                // DISPLAY RESULT
                displayMessage(`${target.name}: Oh woe is me!  My sadness in unfathomable!  I cannot continue on this way...`);
                return `${target.name}'s spirit was broken!  They fled the battle!`
            }

            // UPDATE STATS
            target.firepower += 1;
            target.accuracy -= 0.1;

            // DISPLAY RESULT
            displayMessage(`${target.name}: Such a haunting melody... A sadness I know all too well...`);
            return `${target.name}'s firepower rose by 1, but their accuracy fell by 10%!`

        case 'edgy':
            return `${target.name}: What a stupid song!  You're better off making spam ${attacker.name}!`;

        case 'neutral':
            if(Math.round(Math.random())) {
                // UPDATE STATS
                target.temperament = 'moody';

                // DISPLAY MESSAGE
                displayMessage(`${target.name}:  That Somber Waltz really put me in a bad mood...`);
                return `${target.name} is feeling moody!`;
                
            }
            // DISPLAY MESSAGE
            return `${attacker.name} song had no effect on ${target.name}!`
    }
}

const singDarkSerenade = (attacker, target) => {
    displayMessage(`${attacker.name} sang an angsty song to ${target.name}.`);
    switch(target.temperament){
        case 'happy':
            //UPDATE STATS
            target.temperament = 'moody';
            //DISPLAY MESSAGE
            displayMessage(`${target.name}: What an awful song!  It really put me in a bad mood!`);
            return `${target.name} is feeling moody!`;

        case 'moody':
            //UPDATE STATS
            target.temperament = 'happy';
            //DISPLAY MESSAGE
            displayMessage(`${target.name}: I think I like this human music.  I'm feeling hyped!`);
            return `${target.name} is feeling happy!`

        case 'edgy':
            //UPDATE STATS
            target.firepower += 1;
            target.accuracy -= 0.1;
            //DISPLAY MESSAGE
            displayMessage(`${target.name}: Anger is the source of my strength, and this music is making me <strong class='decrease'>very angry!!!</strong>`);
            return `${target.name}'s firepower rose by <strong class='increase'>1</strong> and their accuracy decreased by <strong class='decrease'>10%</strong>`;

        case 'neutral':
            if(Math.round(Math.random())) {
                target.temperament = 'edgy';
                return `${target.name}:  It's just one of those days.  I can feel my anger taking over!!!`;
            }
            return `${attacker.name} song had no effect on ${target.name}!`
    }
}

//CHECK STATUS

const isAlive = (actor) => {
    return actor.hull > 0;
}

const isAttacking = (actor) => {
    //Angry aliens attack every turn.
    //Moody aliens counter attack occasionally.
    //Happy always counter attacks occasionally.
    //Neutral aliens only counter attack
    switch(actor.temperament){
        case 'edgy':
            return true;
        case 'moody':
            //There's a 50 / 50 chance a moody alien will counter attack
            return Math.round(Math.random()) ? true : false;
        case 'happy':
            //There's a 33% chance a happy alien will defend an ally
            return Math.random() < 0.33 ? true : false;
        case 'neutral':
            return true;
    }
}

//BATTLE LOOP

const battle = (game, target) => {
    const { player, aliens } = game;
    //the player attacks first
    //get player attack type

    switch(player.attack){
        case "laser":
            displayMessage(attack(player,target));
            break;
        case "missile":
            displayMessage(fireMissile(player,target,player.missileType));
            break;
        case "sing":
            displayMessage(sing(player,target));
            break;
        case "inspect":
            break;
        default:
            console.log(`Error: Could not determine player.attack. Value: ${player.attack}`);
            break;
    }

    //GET ATTACKERS
    const attackers = [];

    //IS THE CURRENT ALIEN ALIVE?
    if(target.hull <= 0){
        target.status = 'dead';
    }
    //WHAT IS THE CURRENT ALIENS STATUS?
    switch(target.status){
        case 'active':
            if(target.temperament !== 'moody'){
                attackers.push(target)
            } else {
                if(isAttacking(target)) attackers.push(target);
            };
            break;
        case 'fled':
            //DISPLAY RETREAT MESSAGE
            displayMessage(`${target.name} has fled the battle!`);
            //GET BONUS
            break;
        case 'dead':
            displayMessage(`${capitalize(player.name)} has defeated ${capitalize(target.name)}!`);
            displayMessage(`Great work!`);
            //GET BONUS
            break;
        default:
            console.log(`Error: Could not determine target.status. Value: ${target.status}`);
            break;
    }

    //GET THE REST OF THE ATTACKERS
    const otherAliens = aliens.filter(alien => alien.name !== target.name);
    otherAliens.forEach(alien => {
        if(alien.temperament === 'edgy' || alien.temperament === 'happy'){
            if(isAttacking(alien)) attackers.push(alien);
        }
    })
    console.log(otherAliens);
    console.log(attackers);

    //the aliens attack next
    attackers.forEach((attacker) => {
        if(isAlive(player)){
            displayMessage(attack(attacker, player));
            displayStatus(player);
            if(!isAlive(player)){
                //display DEFEAT Message
                displayMessage(`${player.name} was defeated by ${attacker.name}`);
            }
        }
    })
}