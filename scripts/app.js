document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const confirm = document.getElementById('confirm');
    confirm.addEventListener('click', () => {
        //confirm action
        game.update(getInput());
    })
    const input = document.getElementById('player-input');
    input.addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            game.update(getInput());
        }
    })
    game.start();
})