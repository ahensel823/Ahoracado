// Trata las palabras 
const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
// Trata el final del juego
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
// Trata alertas y partes del muñeco
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');

// Palbras
const wordList = [
  'MERCADO',
  'GOLPEAR',
  'HERIR',
  'VENTOSO',
  'MONEDA',
  'ARROJAR',
  'SILENCIO',
  'ENGAÑO',
  'CAIDA',
  'CUESTA',
];

// Palbra que se elijio
let selectedWord = null;
console.log(selectedWord)
// Guarda una cuenta del numero de letra equivocadas
let incorrectCount = 0;
// Guarda letras correctas
const correctLetters = [];
// Guarda letras incorrectas
const incorrectLetters = [];

// Se selecciona una palabra al azar y se inicializa en el DOM
function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}

// Alerta de letra ya elejida
function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 1000);
}

// Actualiza la figura
function updateFigure() {
  try {
    bodyParts[incorrectCount].style.display = 'block';
    incorrectCount++;
  } catch (error) {}
}

// Cartel cuando el jugador gana
function successState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = 'Hurrah! You won.';
  }, 400);
}

// Cartel cuando el jugador pierde
function failureState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = `Oops! You lost. The right word is "${selectedWord}"`;
  }, 400);
}

// Chequea si la tecla tipeada es parte de la palabra y actualiza en el DOM si es necesario
function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;

  // Handle keyboard events
  if (
    !backdrop.classList.contains('visible') &&
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (incorrectLetters.includes(character)) {
        displayIndication();
      } else {
        incorrectLetters.push(character);
        if (!incorrect.classList.contains('visible')) {
          incorrect.classList.add('visible');
        }
        incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
        updateFigure();
      }
    }
  }

  // Create a word from all letter items
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  // Check if created word is correct
  if (formedWord === selectedWord) {
    successState();
  }

  // Check if man was hung
  if (incorrectCount >= 6) {
    failureState();
  }
}

// Reset all variables and start a new game
function startNewGame() {
  selectedWord = null;
  incorrectCount = 0;
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  incorrect.classList.remove('visible');
  backdrop.classList.remove('visible');
  finalMsg.classList.remove('visible');
  initializeWord();
}

// Start the game
initializeWord();

// Event Listeners
window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);
