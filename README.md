# SPACE BATTLE APP

> Earth has been attacked by the Trafalmadorians, a nefarious race of invaders hell bent on seizing control of the world and it's **SPAM!** You are on a mission to destroy every last alien ship.

> Battle the aliens as you try to destroy them with your lasers.

> There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

## RULES

1. Each turn, the player can choose to attack the next alien ship or retreat.
2. If the player chooses to attack, starting with the player, the player and alien will fire their lasers at eachother.
    - The attacker will fire their lasers.
    - If the laser hits (based on accuracy) the attacker will deal damage equal to their firepower.
    - If the attacker reduces their opponents hull to value equal or less than 0, they win.
    - If the player wins, they can choose to continue to fight or retreat.
        - If the player attacks, they will battle the next alien.  
        - If the player retreats, the game will be over.
    - If the alien wins, the game will result in a game over.
1. The game is finished when they player has defeated all 6 aliens (WIN) or is defeated in battle (LOSE).

## FLOW

1. Introduction: Display a brief message describing the narrative and instructions on how to play the game.
2. Get User Input
    - user input = 'attack'
        1. Begin battle loop: (player attacks, log result, check status, log result, alien attacks, log result, check status, log result, continue until either party's hull is reduced to zero)
        2. If the player wins, return to Get User Input.
        3. If the player loses, continue to Game Over
    - user input = 'retreat'
        1. Continue to Game Over
3. Game Over
    1. Log the results of the Game
    2. Ask the Player if they would like to play again

## ACTORS

- The Player
    - ### Properties
    - Hull *(Player Health)* = 20
    - Firepower *(Damage Dealt)* = 5
    - Accuracy *(Chance to Hit)* = 0.7

- Aliens
    - ### Properties
    - Hull *(Alien Health)* = 3 ~ 6
    - Firepower *(Damage Dealt)* = 2 ~ 4
    - Accuracy *(Chance to Hit)* = 0.6 ~ 0.8

## INTERFACE

- A method or element for displaying messages.
- A method or element for getting user input.
- A method or element for displaying the player's current status

## MESSAGES

*Key messages displayed during the game.*

> ### INTRODUCTION
>
> [USER]!  Come in [USER]!  The Earth is under attack and you are our only hope!  The nefarious Tralfamadorians are invading, and they want our **SPAM!**  Take to the skies in your trusty [SHIP] and defeat this evil alien horde!  For God!  For Country!  For **SPAM!!!**

> ### VICTORY
>
> Congratulations [USER]!  Your unmatched tactical prowess proved invaluable in the fateful encounter with the Tralfamadorians!  The battle is won!  But know this... as long as there are hungry aliens in search of a salty meaty treat, our Earth will never truly be safe!  In time we will again need your services, but for now, enjoy some **SPAM!**

> ### DEFEAT
>
> I'm sorry [USER].  Though your efforts were valiant, they were no match for the Tralfamadorians.  All of humanity was enslaved and forced to work in Spam factories to sate the Tralfamadorians eternal cravings for salty, processed 'meat.'