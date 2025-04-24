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
            question: "Em que ano a Coca-Cola foi fundada?",
            options: ["1886", "1892", "1901", "1915"],
            answer: 0,
            funFact: "A Coca-Cola foi inventada pelo farmacêutico John Pemberton em Atlanta, Georgia, e vendida originalmente como um tônico medicinal!"
        },
        {
            question: "Qual é o símbolo mais icônico da Coca-Cola?",
            options: ["A garrafa contour", "O urso polar", "A cor vermelha", "O Papai Noel"],
            answer: 0,
            funFact: "A garrafa contour foi criada em 1915 para ser reconhecível mesmo no escuro! É um dos designs mais famosos do mundo."
        },
        {
            question: "A Jasmine Alimentos é conhecida por produtos:",
            options: ["Lácteos", "Integrais e funcionais", "Carnes", "Bebidas alcoólicas"],
            answer: 1,
            funFact: "A Jasmine foi pioneira no Brasil em alimentos orgânicos e hoje tem mais de 300 produtos entre orgânicos, integrais e funcionais!"
        },
        {
            question: "Qual destes é um produto típico da Jasmine Alimentos?",
            options: ["Sorvetes", "Pães de queijo", "Granolas", "Chocolates"],
            answer: 2,
            funFact: "As granolas da Jasmine são feitas com ingredientes 100% integrais e muitas versões são orgânicas e sem glúten!"
        },
        {
            question: "O que a empresa Gerar faz?",
            options: ["Fabrica alimentos", "Fabrica bebidas", "Recruta jovens aprendizes", "Vende material de escritório"],
            answer: 2,
            funFact: "A Gerar já ajudou milhares de jovens a ingressarem no mercado de trabalho através do programa Jovem Aprendiz!"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    postCredits.style.display = 'none';

    // Efeito flutuante para o botão iniciar
    setInterval(() => {
        startBtn.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            startBtn.style.transform = 'translateY(0)';
        }, 1000);
    }, 2000);

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        startBtn.classList.add('hide');
        quizContainer.classList.add('floating');
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const question = questions[index];
        questionText.innerHTML = `<span class="question-mark">?</span> ${question.question}`;
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn', 'float');
            optionBtn.innerHTML = `<span class="option-number">${i+1}</span> ${option}`;
            optionBtn.addEventListener('click', () => checkAnswer(i));
            optionsContainer.appendChild(optionBtn);
            
            // Efeito de entrada escalonada
            optionBtn.style.animationDelay = `${i * 0.1}s`;
        });
        
        nextBtn.classList.add('hide');
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].answer;
        const optionBtns = optionsContainer.querySelectorAll('.option-btn');
        
        // Desativa todos os botões
        optionBtns.forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        if (selectedIndex === correctIndex) {
            optionBtns[selectedIndex].classList.add('correct');
            score++;
            
            // Efeito de confete para resposta correta
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.innerHTML = '🎉';
            optionBtns[selectedIndex].appendChild(confetti);
        } else {
            optionBtns[selectedIndex].classList.add('wrong');
            optionBtns[correctIndex].classList.add('correct');
        }
        
        // Mostra curiosidade
        const funFact = document.createElement('div');
        funFact.classList.add('fun-fact');
        funFact.textContent = `💡 Curiosidade: ${questions[currentQuestionIndex].funFact}`;
        optionsContainer.appendChild(funFact);
        
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
        
        const percentage = Math.round((score / questions.length) * 100);
        scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!<br>(${percentage}% de acerto)`;
        
        // Elementos da seção de agradecimento
        const resultTitle = document.getElementById('result-title');
        const resultMessage1 = document.getElementById('result-message-1');
        const resultMessage2 = document.getElementById('result-message-2');
        const resultMessage3 = document.getElementById('result-message-3');
        const resultImage = document.getElementById('result-image');
        
        // Remove a classe 'loaded' para resetar a imagem
        resultImage.classList.remove('loaded');
        
        // Define a nova imagem com base no desempenho
        let imageUrl;
        if (percentage >= 80) {
            prizeText.innerHTML = '🏆 Uau! Você garantiu <strong>2 Coquinhas</strong> e <strong>mini granolas da Jasmine</strong>!';
            resultTitle.textContent = '🎉 Sensacional! ';
            resultMessage1.innerHTML = 'Seu conhecimento sobre nossos parceiros está <strong>no ponto!</strong>';
            resultMessage2.innerHTML = 'Você mandou muito bem e mostrou que está preparado para qualquer desafio! Você garantiu <strong>2 Coquinhas</strong> e <strong>mini granolas da Jasmine</strong>!';
            resultMessage3.innerHTML = 'Continue nesse ritmo e o sucesso será só uma consequência! ✨';
            imageUrl = "https://usagif.com/wp-content/uploads/gif/obr1gdo-32.gif";
        } else if (percentage >= 50) {
            prizeText.innerHTML = '👍 Muito bem! Você ganhou <strong>1 Coquinha</strong> para refrescar o cérebro!';
            resultTitle.textContent = '👏 Muito bem! tá no caminho certo!';
            resultMessage1.textContent = 'Você foi bem, mas dá pra brilhar ainda mais!';
            resultMessage2.innerHTML = 'Você garantiu <strong>2 Coquinhas</strong> e <strong>mini granolas da Jasmine</strong>!';
            resultMessage3.textContent = 'Aprender é um superpoder, continue evoluindo! 🚀';
            imageUrl = "https://usagif.com/wp-content/uploads/gif/obr1gdo-32.gif";
        } else {
            prizeText.innerHTML = '✨ Valeu por participar! Cada passo é um aprendizado!';
            resultTitle.textContent = '💪 É só o começo!';
            resultMessage1.textContent = 'Errar faz parte do caminho pra acertar!';
            resultMessage2.innerHTML = 'Bora conhecer mais sobre <strong>Coca-Cola</strong> e <strong>Jasmine Alimentos</strong>?';
            resultMessage3.textContent = 'Você pode tentar de novo quando quiser. Estamos na torcida! 🔁';
            imageUrl = "https://usagif.com/wp-content/uploads/gif/obr1gdo-32.gif";
        }

        
        // Pré-carrega a imagem antes de exibir
        const imgLoader = new Image();
        imgLoader.src = imageUrl;
        imgLoader.onload = function() {
            resultImage.src = imageUrl;
            resultImage.onload = function() {
                // Mostra a seção e a imagem
                postCredits.style.display = 'block';
                setTimeout(() => {
                    postCredits.classList.add('active');
                    resultImage.classList.add('loaded');
                    postCredits.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            };
        };
        
        // Fallback caso a imagem não carregue
        imgLoader.onerror = function() {
            resultImage.src = "https://odnet.com.br/wp-content/uploads/2019/07/obrigado.jpg";
            postCredits.style.display = 'block';
            setTimeout(() => {
                postCredits.classList.add('active');
                resultImage.classList.add('loaded');
                postCredits.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        };
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        postCredits.style.display = 'none';
        postCredits.classList.remove('active');
        startBtn.classList.remove('hide');
    }
});

// Animação de scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);