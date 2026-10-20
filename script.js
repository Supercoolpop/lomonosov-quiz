const questions = [
  {
    question: "В каком году родился Михаил Васильевич Ломоносов?",
    options: ["1706", "1711", "1725", "1730"],
    correct: 1
  },
  {
    question: "Где родился Ломоносов?",
    options: [
      "В Москве",
      "В селе Денисовка (Архангельская губерния)",
      "В Санкт-Петербурге",
      "В Киеве"
    ],
    correct: 1
  },
  {
    question: "Сколько лет было Ломоносову, когда он ушёл учиться в Москву?",
    options: ["12", "16", "19", "25"],
    correct: 2
  },
  {
    question: "В какое учебное заведение поступил Ломоносов в Москве в 1731 году?",
    options: [
      "Славяно-греко-латинская академия",
      "Московский университет",
      "Навигацкая школа",
      "Академический университет"
    ],
    correct: 0
  },
  {
    question: "В какой стране Ломоносов изучал горное дело и химию в 1736–1741 гг.?",
    options: ["Франция", "Англия", "Германия", "Италия"],
    correct: 2
  },
  {
    question: "Какой закон в области химии открыл Ломоносов?",
    options: [
      "Закон сохранения массы веществ",
      "Периодический закон",
      "Закон Авогадро",
      "Закон Бойля — Мариотта"
    ],
    correct: 0
  },
  {
    question: "Какую науку Ломоносов назвал «матерью всех наук» и развивал как отдельную дисциплину?",
    options: ["Физику", "Химию", "Астрономию", "Математику"],
    correct: 1
  },
  {
    question: "Какое явление Ломоносов объяснил наличием атмосферы у Венеры?",
    options: [
      "Солнечное затмение",
      "Прохождение Венеры по диску Солнца",
      "Лунное затмение",
      "Полярное сияние"
    ],
    correct: 1
  },
  {
    question: "Что основал Ломоносов в 1755 году в Москве?",
    options: [
      "Академию художеств",
      "Московский университет",
      "Петербургскую академию наук",
      "Смольный институт"
    ],
    correct: 1
  },
  {
    question: "Какую реформу в литературе провёл Ломоносов?",
    options: [
      "Ввёл силлабо-тоническое стихосложение",
      "Создал «теорию трёх штилей»",
      "Отменил церковнославянский язык",
      "Ввёл латинский алфавит"
    ],
    correct: 1
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const currentQEl = document.getElementById("current-q");
const totalQEl = document.getElementById("total-q");
const scoreEl = document.getElementById("score");
const maxScoreEl = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

let currentIndex = 0;
let score = 0;
let answered = false;

totalQEl.textContent = questions.length;
maxScoreEl.textContent = questions.length;

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.classList.add("hidden");

  const q = questions[currentIndex];
  currentQEl.textContent = currentIndex + 1;
  progressBar.style.width = ((currentIndex) / questions.length) * 100 + "%";
  questionText.textContent = q.question;

  answersBox.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    answersBox.appendChild(btn);
  });
}

function selectAnswer(chosenIndex, btn) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const allBtns = answersBox.querySelectorAll(".answer");

  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("correct");
    if (i === chosenIndex && i !== q.correct) b.classList.add("wrong");
  });

  if (chosenIndex === q.correct) {
    score++;
    feedback.textContent = "Верно!";
    feedback.className = "feedback ok";
  } else {
    feedback.textContent = "Неверно. Правильный ответ: " + q.options[q.correct];
    feedback.className = "feedback err";
  }

  progressBar.style.width = ((currentIndex + 1) / questions.length) * 100 + "%";
  nextBtn.classList.remove("hidden");
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Результат" : "Далее";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  scoreEl.textContent = score;
  if (score === questions.length) {
    resultMessage.textContent = "Блестяще! Вы настоящий знаток Ломоносова 🏆";
  } else if (score >= questions.length * 0.7) {
    resultMessage.textContent = "Отличный результат! Вы хорошо знаете биографию учёного 👍";
  } else if (score >= questions.length * 0.4) {
    resultMessage.textContent = "Неплохо, но есть что повторить 📖";
  } else {
    resultMessage.textContent = "Стоит перечитать биографию Ломоносова — и попробовать снова 💪";
  }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => {
  showScreen(startScreen);
});
