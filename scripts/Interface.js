const displayMessage = (message) => {
    const messageLog = document.getElementById('message-log');
    messageLog.innerHTML += message + '<br>';
}

const displayIntro = (player) => {
    const introMessage = `${player.name}!  Come in ${player.name}!  The Earth is under attack, and you are our only hope!  The nefarious Tralfamadorians are invading, and they want our <strong>SPAM!</strong>  Take to the skies in your trusty ${player.ship} and defeat this evil alien horde!  For God!  For Country!  For <strong>SPAM!</strong>`;
    displayMessage(introMessage);
}

const getInput = () => {
    const inputElement = document.getElementById('player-input');
    const input = inputElement.value.trim().toLowerCase();
    inputElement.value = '';
    return input;
}