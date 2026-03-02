const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Mark Language",
        d: "Hyper Tool Multi Language",
        correct: "a"
    },
    {
        question: "Which language is used for styling?",
        a: "HTML",
        b: "CSS",
        c: "Java",
        d: "Python",
        correct: "b"
    },
    {
        question: "Which is a JavaScript framework?",
        a: "Django",
        b: "Flask",
        c: "React",
        d: "Laravel",
        correct: "c"
    },
    {
        question: "Which tag is used for images?",
        a: "<img>",
        b: "<image>",
        c: "<pic>",
        d: "<src>",
        correct: "a"
    }
];

/* ========== SHUFFLE FUNCTION (Fisher-Yates) ========== */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Shuffle questions on load */
shuffle(quizData);

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let currentQuiz = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

/* Load Question */
function loadQuiz() {
    deselectAnswers();

    const currentData = quizData[currentQuiz];

    questionEl.innerText = currentData.question;
    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;
    c_text.innerText = currentData.c;
    d_text.innerText = currentData.d;

    /* Restore previous answer */
    if (userAnswers[currentQuiz]) {
        document.getElementById(userAnswers[currentQuiz]).checked = true;
    }

    updateProgress();
}

/* Deselect */
function deselectAnswers() {
    answerEls.forEach(answer => answer.checked = false);
}

/* Get Selected */
function getSelected() {
    let selected = null;
    answerEls.forEach(answer => {
        if (answer.checked) {
            selected = answer.id;
        }
    });
    return selected;
}

/* Update Progress */
function updateProgress() {
    let progressPercent = ((currentQuiz + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercent + "%";
    progressText.innerText = `${currentQuiz + 1} / ${quizData.length}`;
}

/* Next Button */
nextBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (answer) {
        userAnswers[currentQuiz] = answer;
    }

    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        loadQuiz();
    } else {
        showResults();
    }
});

/* Previous Button */
prevBtn.addEventListener("click", () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
});

/* Show Results */
function showResults() {
    score = 0;

    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct) {
            score++;
        }
    }

    document.querySelector(".quiz-container").innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
    `;
}

/* Start Quiz */
loadQuiz();