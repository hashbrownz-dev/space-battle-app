const capitalize = (word) => {
    const array = Array.from(word);
    array[0] = array[0].toUpperCase();
    return array.join('');
}

const displayMessage = (message) => {
    const messageLog = document.getElementById('message-log');
    messageLog.innerHTML += '<br>' + message + '<br>';
}

const displayError = (valid) => {
    displayMessage(`Invalid Input`);
    //if valid is an array of valid inputs than we can use valid.join(', ')
    displayMessage(`Try to use one of the following: `);
    const formatted = valid.map((element) => {
        element[0].toUpperCase();
        element = "'" + capitalize(element) + "'";
        return element;
    })
    displayMessage(formatted.join(', '));
}

const displayIntro = (player) => {
    displayMessage(
        `${player.name}!  Come in ${player.name}!  The Earth is under attack, and you are our only hope!  The nefarious Tralfamadorians are invading, and they want our <strong>SPAM!</strong>  Take to the skies in your trusty ${player.ship} and defeat this evil alien horde!  For God!  For Country!  For <strong>SPAM!</strong>`
    );
}

const displayWin = (player) => {
    displayMessage(
        `Congratulations ${player.name}!  Your unmatched tactical prowess proved invaluable in the fateful encounter with the Tralfamadorians!  The battle is won!  But know this... as long as there are hungry aliens in search of a salty meaty treat, our Earth will never truly be safe!  In time we will again need your services...<br><br>
        But for now, enjoy some <strong>SPAM!</strong>`
    )
}

const displayLoss = (player) => {
    displayMessage(
        `I'm sorry ${player.name}.  Though your efforts were valiant, they were no match for the Tralfamadorians.  All of humanity was enslaved and forced to work in <strong>SPAM</strong> factories to sate the Tralfamadorians eternal cravings for salty, processed 'meat.'`
    )
}

const displayRetreat = (player) => {
    displayMessage(
        `${player.name}...  In your cowardice you fled, leaving humanity and it's <strong>SPAM</strong> vulnerable to alien invasion.  Men, women, children, and even babies were enslaved and forced to work in <strong>SPAM</strong> factories to sate the Tralfamadorians eternal cravings for salty, processed 'meat'.`
    )
}

const displayPlayAgain = () => {
    displayMessage(
        `But all hope is not yet lost...`
    )
    displayMessage(
        `Would you like to Play Again?`
    )
    displayMessage(
        `(Y)es / (N)o`
    )
}

const displayStatus = (player) => {
    const statusLog = document.getElementById('status-log');
    const { name, hull, hullMax, firepower, accuracy } = player;
    statusLog.innerHTML = `${name} Hull: ${hull} / ${hullMax} Firepower: ${firepower} Accuracy: ${accuracy}`;
}

const getInput = () => {
    const inputElement = document.getElementById('player-input');
    const input = inputElement.value.trim().toLowerCase();
    inputElement.value = '';
    return input;
}

const clearDisplay = () => {
    document.getElementById('message-log').innerHTML = '';
}

const clearStatus = () => {
    document.getElementById('status-log').innerHTML = '';
}