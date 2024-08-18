const elements = {
    "Calcium (Ca)": 20,
    "Scandium (Sc)": 21,
    "Titanium (Ti)": 22,
    "Vanadium (V)": 23,
    "Chromium (Cr)": 24,
    "Manganese (Mn)": 25,
    "Iron (Fe)": 26,
    "Cobalt (Co)": 27,
    "Nickel (Ni)": 28,
    "Copper (Cu)": 29,
    "Zinc (Zn)": 30,
    "Gallium (Ga)": 31,
    "Germanium (Ge)": 32,
    "Arsenic (As)": 33,
    "Selenium (Se)": 34,
    "Bromine (Br)": 35,
    "Krypton (Kr)": 36,
    "Rubidium (Rb)": 37,
    "Strontium (Sr)": 38,
    "Yttrium (Y)": 39,
    "Zirconium (Zr)": 40,
    "Niobium (Nb)": 41,
    "Molybdenum (Mo)": 42,
    "Technetium (Tc)": 43,
    "Ruthenium (Ru)": 44,
    "Rhodium (Rh)": 45,
    "Palladium (Pd)": 46,
    "Silver (Ag)": 47,
    "Cadmium (Cd)": 48,
    "Indium (In)": 49,
    "Tin (Sn)": 50,
    "Antimony (Sb)": 51,
    "Tellurium (Te)": 52,
    "Iodine (I)": 53,
    "Xenon (Xe)": 54,
    "Cesium (Cs)": 55,
    "Barium (Ba)": 56,
    "Lanthanum (La)": 57,
    "Cerium (Ce)": 58,
    "Praseodymium (Pr)": 59,
    "Neodymium (Nd)": 60,
    "Promethium (Pm)": 61,
    "Samarium (Sm)": 62,
    "Europium (Eu)": 63,
    "Gadolinium (Gd)": 64,
    "Terbium (Tb)": 65,
    "Dysprosium (Dy)": 66,
    "Holmium (Ho)": 67,
    "Erbium (Er)": 68,
    "Thulium (Tm)": 69,
    "Ytterbium (Yb)": 70,
    "Lutetium (Lu)": 71,
    "Hafnium (Hf)": 72,
    "Tantalum (Ta)": 73,
    "Tungsten (W)": 74,
    "Rhenium (Re)": 75,
    "Osmium (Os)": 76,
    "Iridium (Ir)": 77,
    "Platinum (Pt)": 78,
    "Gold (Au)": 79,
    "Mercury (Hg)": 80,
    "Thallium (Tl)": 81,
    "Lead (Pb)": 82,
    "Bismuth (Bi)": 83,
    "Polonium (Po)": 84,
    "Astatine (At)": 85,
    "Radon (Rn)": 86,
    "Francium (Fr)": 87,
    "Radium (Ra)": 88,
    "Actinium (Ac)": 89,
    "Thorium (Th)": 90,
    "Protactinium (Pa)": 91,
    "Uranium (U)": 92,
    "Neptunium (Np)": 93,
    "Plutonium (Pu)": 94,
    "Americium (Am)": 95,
    "Curium (Cm)": 96,
    "Berkelium (Bk)": 97,
    "Californium (Cf)": 98,
    "Einsteinium (Es)": 99,
    "Fermium (Fm)": 100,
    "Mendelevium (Md)": 101,
    "Nobelium (No)": 102,
    "Lawrencium (Lr)": 103,
    "Rutherfordium (Rf)": 104,
    "Dubnium (Db)": 105,
    "Seaborgium (Sg)": 106,
    "Bohrium (Bh)": 107,
    "Hassium (Hs)": 108,
    "Meitnerium (Mt)": 109,
    "Darmstadtium (Ds)": 110,
    "Roentgenium (Rg)": 111,
    "Copernicium (Cn)": 112,
    "Nihonium (Nh)": 113,
    "Flerovium (Fl)": 114,
    "Moscovium (Mc)": 115,
    "Livermorium (Lv)": 116,
    "Tennessine (Ts)": 117,
    "Oganesson (Og)": 118



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
