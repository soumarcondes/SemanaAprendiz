document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const quizContainer = document.getElementById('quiz-container');
    const scoreText = document.getElementById('score-text');
    const prizeText = document.getElementById('prize-text');
    const postCredits = document.getElementById('post-credits');

    const questions = [
        {
            question: 'Qual empresa foi parceira do evento?',
            options: ['Coca-Cola', 'Pepsi', 'Fanta', 'Sprite'],
            answer: 0,
        },
        {
            question: 'Quem forneceu mini granolas?',
            options: ['Jasmine Alimentos', 'Nestlé', 'Kellogg\'s', 'Mãe Terra'],
            answer: 0,
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        startBtn.classList.add('hide');
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const question = questions[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => checkAnswer(i));
            optionsContainer.appendChild(optionBtn);
        });
        
        nextBtn.classList.remove('hide');
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].answer;
        const optionBtns = optionsContainer.querySelectorAll('.option-btn');
        
        if (selectedIndex === correctIndex) {
            optionBtns[selectedIndex].classList.add('correct');
            score++;
        } else {
            optionBtns[selectedIndex].classList.add('wrong');
            optionBtns[correctIndex].classList.add('correct');
        }
        
        nextBtn.classList.remove('hide');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizContainer.classList.add('hide');
        resultContainer.classList.remove('hide');
        
        scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
        if (score === questions.length) {
            prizeText.textContent = 'Parabéns! Você ganhou uma granola da Jasmine e uma Coca-Cola!';
        } else {
            prizeText.textContent = 'Obrigado pela participação! Continue se esforçando!';
        }
        
        postCredits.classList.remove('hide');
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        postCredits.classList.add('hide');
        startBtn.classList.remove('hide');
    }
});
