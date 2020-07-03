const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}



function checkForMatch() {
    // do cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    // match detected
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    // no match
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500);
}


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};
shuffle();

var newGameButton = document.getElementById("new-game-button");

newGameButton.addEventListener("click", function(e) {
    e.preventDefault();
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    })
    firstCard = secondCard = null;
    hasFlippedCard = lockBoard = false;
    shuffle();
});


cards.forEach(card => card.addEventListener('click', flipCard))