document.addEventListener('DOMContentLoaded', function() {
    // Código do quiz (já existente)
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const scoreText = document.getElementById('score-text');
    const prizeText = document.getElementById('prize-text');

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
    restartButton.addEventListener('click', restartQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        currentQuestionIndex = 0;
        score = 0;
        nextButton.classList.remove('hide');
        resultContainer.classList.add('hide');
        document.getElementById('post-credits').classList.add('hide');
    
        showQuestion(questions[currentQuestionIndex]);
    }


    function showQuestion(question) {
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        
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
        
        // Desabilita todos os botões após selecionar uma resposta
        optionButtons.forEach(button => {
            button.disabled = true;
        });
        
        // Indica a resposta correta e a incorreta
        if (index === correctIndex) {
            optionButtons[index].classList.add('correct');
            score++;
        } else {
            optionButtons[index].classList.add('wrong');
            optionButtons[correctIndex].classList.add('correct');
        }
        
        nextButton.disabled = false;
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

    function showResult() {
        questionContainer.classList.add('hide'); // 👈 Isso já está certo!
        nextButton.classList.add('hide');
        resultContainer.classList.remove('hide');
        document.getElementById('post-credits').classList.remove('hide');
    
        scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    
        if (score === questions.length) {
            prizeText.textContent = "Parabéns! Você ganhou 2 Coca-Colas e mini granolas da Jasmine! Retire seu prêmio com o coordenador.";
        } else if (score >= 3) {
            prizeText.textContent = "Muito bom! Você ganhou 1 Coca-Cola e uma mini granola da Jasmine! Retire seu prêmio com o coordenador.";
        } else if (score >= 1) {
            prizeText.textContent = "Continue tentando! Você ganhou uma mini granola da Jasmine! Retire seu prêmio com o coordenador.";
        } else {
            youLost();
        }
    }


    function youLost() {
    prizeText.textContent = "Eita! Você não ganhou nem a coquinha geladinha 🥤 e nem a granola 🥣... Tenta de novo, vai que dá!";
    }

    function restartQuiz() {
        startQuiz();
    }

    // Implementação da função para revelar elementos ao descer a página
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: se o efeito for único, desative o observer para o elemento
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));
});
