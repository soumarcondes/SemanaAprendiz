document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score-text');
    const prizeText = document.getElementById('prize-text');
    const postCredits = document.getElementById('post-credits');

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "Em que ano a Coca-Cola foi fundada?",
            options: ["1886", "1892", "1901", "1915"],
            correctAnswer: 0
        },
        {
            question: "Qual é o símbolo mais icônico da Coca-Cola?",
            options: ["A garrafa contour", "O urso polar", "A cor vermelha", "O Papai Noel"],
            correctAnswer: 0
        },
        {
            question: "A Jasmine Alimentos é conhecida por produtos:",
            options: ["Lácteos", "Integrais e funcionais", "Carnes", "Bebidas alcoólicas"],
            correctAnswer: 1
        },
        {
            question: "Qual destes é um produto típico da Jasmine Alimentos?",
            options: ["Sorvetes", "Pães de queijo", "Granolas", "Chocolates"],
            correctAnswer: 2
        },
        {
            question: "O que a empresa Gerar faz?",
            options: ["Fabrica alimentos", "Fabrica bebidas", "Recruta jovens aprendizes", "Vende material de escritório"],
            correctAnswer: 2
        }
    ];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', showNextQuestion);
    restartButton.addEventListener('click', startQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hide');
        nextButton.classList.remove('hide');
        postCredits.classList.add('hide');

        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        nextButton.disabled = true;

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(index) {
        const correctIndex = questions[currentQuestionIndex].correctAnswer;
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');

        optionButtons.forEach(btn => btn.disabled = true);

        if (index === correctIndex) {
            optionButtons[index].classList.add('correct');
            score++;
        } else {
            optionButtons[index].classList.add('wrong');
            optionButtons[correctIndex].classList.add('correct');
        }

        nextButton.disabled = false;
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        questionContainer.classList.add('hide');
        nextButton.classList.add('hide');
        resultContainer.classList.remove('hide');
        postCredits.classList.remove('hide');

        scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;

        if (score === questions.length) {
            prizeText.textContent = "Parabéns! Você
