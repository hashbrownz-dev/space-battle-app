document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', () => {
        //confirm action
        // playerChoice = getInput();
        // console.log(playerChoice);
        game.update(getInput());
    })
    const input = document.getElementById('player-input');
    input.addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            // playerChoice = getInput();
            // console.log(playerChoice);
            game.update(getInput());
        }
    })
    game.start();
})