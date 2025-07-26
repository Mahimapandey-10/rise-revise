const frontInput = document.getElementById('frontInput');
const backInput = document.getElementById('backInput');
const cardContainer = document.querySelector('.cardcontainer');
const addBtn = document.querySelector('button');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Display flashcards on load
window.onload = () => {
    flashcards.forEach(card => createCard(card.front, card.back));
};

// Add new flashcard
addBtn.addEventListener('click', () => {
    const frontText = frontInput.value.trim();
    const backText = backInput.value.trim();

    if (frontText && backText) {
        createCard(frontText, backText);
        flashcards.push({ front: frontText, back: backText });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));

        frontInput.value = '';
        backInput.value = '';
    } else {
        alert('Please enter both Question and Answer!');
    }
});

// Create a new card
function createCard(frontText, backText) {
    const card = document.createElement('div');
    card.classList.add('flashcard-item');

    card.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">${frontText}</div>
            <div class="flashcard-back">${backText}</div>
        </div>
        <button class="delete-btn">&times;</button>
    `;

    // Flip card on click
    card.querySelector('.flashcard-inner').addEventListener('click', () => {
        card.querySelector('.flashcard-inner').classList.toggle('flipped');
    });

    // Delete card
    card.querySelector('.delete-btn').addEventListener('click', () => {
        card.remove();
        flashcards = flashcards.filter(c => !(c.front === frontText && c.back === backText));
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    });

    cardContainer.appendChild(card);
}
