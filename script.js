const elements = {
    "Hydrogen (H)": 1,
    "Helium (He)": 2,
    "Lithium (Li)": 3,
    "Beryllium (Be)": 4,
    "Carbon (C)": 6,
    "Nitrogen (N)": 7,
    "Oxygen (O)": 8,
    "Fluorine (F)": 9,
    "Neon (Ne)": 10,
    "Sodium (Na)": 11,
    "Magnesium (Mg)": 12,
    "Aluminium (Al)": 13,
    "Silicon (Si)": 14,
    "Phosphorus (P)": 15,
    "Sulfur (S)": 16,
    "Chlorine (Cl)": 17,
    "Argon (Ar)": 18,
    "Potassium (K)": 19,
    "Calcium (Ca)": 20,
    "Iron (Fe)": 26,
    "Copper (Cu)": 29,
    "Zinc (Zn)": 30,
    "Bromine (Br)": 35,
    "Krypton (Kr)": 36,
    "Silver (Ag)": 47,
    "Iodine (I)": 53,
    "Xenon (Xe)": 54,
    "Gold (Au)": 79,
    "Mercury (Hg)": 80,
    "Lead (Pb)": 82,
    "Uranium (U)": 92



    // Continue adding elements up to 118...
};

let correctCount = 0;
let mistakeCount = 0;
let currentQuestionIndex = 0;
let shuffledElements = shuffleArray(Object.keys(elements));

// HTML element references
const questionElement = document.getElementById('question');
const correctElement = document.getElementById('correct');
const mistakesElement = document.getElementById('mistakes');
const feedbackElement = document.getElementById('feedback');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');

// Shuffle the elements to ensure random questions
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledElements.length) {
        endQuiz();
        return;
    }

    const element = shuffledElements[currentQuestionIndex];
    const correctAnswer = elements[element];
    const options = shuffleArray(generateOptions(correctAnswer));

    questionElement.textContent = `What is the atomic number of ${element}?`;
    optionsElement.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, correctAnswer);
        optionsElement.appendChild(optionElement);
    });

    nextButton.style.display = 'none';
}

function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = Math.floor(Math.random() * 118) + 1;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return options;
}

function selectOption(optionElement, correctAnswer) {
    const selectedAnswer = parseInt(optionElement.textContent);

    if (selectedAnswer === correctAnswer) {
        optionElement.classList.add('correct');
        correctCount++;
        feedbackElement.textContent = 'Correct!';
    } else {
        optionElement.classList.add('wrong');
        mistakeCount++;
        feedbackElement.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
    }

    updateScoreboard();
    disableOptions();
    nextButton.style.display = 'block';
}

function disableOptions() {
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.onclick = null;
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    feedbackElement.textContent = '';
    loadQuestion();
}

function updateScoreboard() {
    correctElement.textContent = `Correct: ${correctCount}`;
    mistakesElement.textContent = `Mistakes: ${mistakeCount}`;
}

function endQuiz() {
    questionElement.textContent = 'Quiz Over!';
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
}

window.onload = function() {
    loadQuestion();
};




// Variables to keep track of mistakes and correct answers
let mistakesCount = 0;
let correctAnswersCount = 0;
let correctAnswerIndex; // Index of the correct answer

// Function to handle answer selection
function handleAnswerClick(selectedIndex) {
    const selectedButton = document.querySelectorAll('.answer-btn')[selectedIndex];
    const correctButton = document.querySelectorAll('.answer-btn')[correctAnswerIndex];

    if (selectedIndex === correctAnswerIndex) {
        selectedButton.style.backgroundColor = 'blue'; // Highlight correct answer in blue
        correctAnswersCount += 1;
    } else {
        selectedButton.style.backgroundColor = 'red'; // Highlight incorrect selection in red
        correctButton.style.backgroundColor = 'blue'; // Highlight correct answer in blue
        mistakesCount += 1;
    }

    // Update Mistakes and Correct Answers
    document.getElementById('correct-answers').textContent = `Correct Answers: ${correctAnswersCount}`;
    document.getElementById('mistakes').textContent = `Mistakes: ${mistakesCount}`;

    // Disable all buttons after an answer is chosen
    document.querySelectorAll('.answer-btn').forEach(button => button.disabled = true);

    // Generate new question after a delay to allow the user to see the correct answer
    setTimeout(() => {
        resetButtons();
        generateQuestion();
    }, 1500); // Delay of 1.5 seconds
}

// Function to reset button colors and enable them
function resetButtons() {
    document.querySelectorAll('.answer-btn').forEach(button => {
        button.style.backgroundColor = ''; // Reset color
        button.disabled = false; // Re-enable button
    });
}

// Function to generate a new question and determine the correct answer
function generateQuestion() {
    // Your logic to generate a question and answers
    // Example:
    correctAnswerIndex = Math.floor(Math.random() * 4); // Randomly choose which option is correct
    // Populate buttons with answers, one of which should be the correct one
}

// Call this function to start the quiz or move to the next question
generateQuestion();
