// --- MÓDULO DO QUIZ (IIFE - Immediately Invoked Function Expression) ---
// Isso cria um escopo privado para evitar poluir o escopo global.
const QuizApp = (() => {
    // --- MAPEAMENTO DOS ELEMENTOS (DOM) ---
    const screens = {
        home: document.getElementById('home-screen'),
        quiz: document.getElementById('quiz-screen'),
        end: document.getElementById('end-screen'),
    };
    
    // Elementos da Interface
    const playerNameInput = document.getElementById('player-name');
    const startButton = document.getElementById('start-button');
    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');
    const scoreElement = document.getElementById('score');
    const timerBarInner = document.getElementById('timer-bar-inner');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedbackText = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-question-button');
    const finalScoreElement = document.getElementById('final-score');
    const rankingList = document.getElementById('ranking-list');
    const restartButton = document.getElementById('restart-button');
    const goHomeButton = document.getElementById('go-home-button');
    
    // Elementos de Navegação
    const navHome = document.getElementById('nav-home');
    const navRanking = document.getElementById('nav-ranking');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    
    // Elementos da Tela Final
    const endTitle = document.getElementById('end-title');
    const endFeedbackText = document.getElementById('end-feedback-text');

    // --- DADOS DO QUIZ (LISTA COMPLETA COM 15 PERGUNTAS) ---
    const questions = [
        {
            pergunta: 'Qual é a forma correta da negação da proposição "Todos os pássaros podem voar"?',
            opcoes: ['Nenhum pássaro pode voar', 'Alguns pássaros não podem voar', 'Todos os pássaros podem nadar'],
            resposta: 'Alguns pássaros não podem voar',
            dificuldade: 'facil',
            explicacao: 'A negação de "Todos" (universal afirmativa) é "Pelo menos um não" ou "Alguns não" (particular negativa).'
        },
        {
            pergunta: 'A proposição "Se p, então q" é falsa quando:',
            opcoes: ['p é verdadeira e q é falsa', 'p é falsa e q é verdadeira', 'p e q são verdadeiras'],
            resposta: 'p é verdadeira e q é falsa',
            dificuldade: 'facil',
            explicacao: 'A única condição que torna uma condicional (p → q) falsa é ter um antecedente verdadeiro e um consequente falso.'
        },
        {
            pergunta: 'Uma proposição é uma tautologia quando sempre resulta em verdadeiro. Essa afirmação define uma tautologia?',
            opcoes: ['Verdadeiro', 'Falso'],
            resposta: 'Verdadeiro',
            dificuldade: 'facil',
            explicacao: 'Correto, uma tautologia é uma proposição que é sempre verdadeira. Ex: (p ∨ ¬p).'
        },
        {
            pergunta: 'O que é uma proposição composta?',
            opcoes: ['Uma proposição que não pode ser verdadeira', 'Uma proposição formada por outras proposições', 'Uma proposição que contém variáveis'],
            resposta: 'Uma proposição formada por outras proposições',
            dificuldade: 'facil',
            explicacao: 'Uma proposição composta é formada pela combinação de proposições simples através de conectivos lógicos.'
        },
        {
            pergunta: 'O que é uma tabela verdade?',
            opcoes: ['Um método para resolver equações', 'Um gráfico de funções matemáticas', 'Uma tabela que mostra todos os valores de verdade possíveis de uma proposição'],
            resposta: 'Uma tabela que mostra todos os valores de verdade possíveis de uma proposição',
            dificuldade: 'facil',
            explicacao: 'A tabela verdade é usada para determinar o valor lógico de uma proposição composta para todas as combinações de valores.'
        },
        {
            pergunta: 'A proposição "Não p ou q" é logicamente equivalente a "Se p, então q"?',
            opcoes: ['Verdadeiro', 'Falso'],
            resposta: 'Verdadeiro',
            dificuldade: 'medio',
            explicacao: 'Esta é a "equivalência da condicional": (p → q) ⇔ (¬p ∨ q).'
        },
        {
            pergunta: 'Qual das opções abaixo representa uma contradição?',
            opcoes: ['p e não p', 'p ou não p', 'p e q'],
            resposta: 'p e não p',
            dificuldade: 'medio',
            explicacao: 'Uma contradição (p ∧ ¬p) é uma proposição que é sempre falsa.'
        },
        {
            pergunta: 'A proposição "p se e somente se q" é verdadeira quando:',
            opcoes: ['p é verdadeira e q é falsa', 'p e q são ambas verdadeiras', 'p e q são ambas verdadeiras ou ambas falsas'],
            resposta: 'p e q são ambas verdadeiras ou ambas falsas',
            dificuldade: 'medio',
            explicacao: 'A bicondicional (p ↔ q) é verdadeira apenas quando p e q têm o mesmo valor lógico.'
        },
        {
            pergunta: 'Se uma proposição p é falsa, sua negação "não p" é:',
            opcoes: ['Verdadeira', 'Falsa', 'Depende de p'],
            resposta: 'Verdadeira',
            dificuldade: 'facil',
            explicacao: 'Pelo princípio da não contradição, se uma proposição é falsa, sua negação é obrigatoriamente verdadeira.'
        },
        {
            pergunta: 'Qual é a Lei de De Morgan para a negação de uma conjunção?',
            opcoes: ['não (p e q) ⇔ não p e não q', 'não (p e q) ⇔ não p ou não q', 'não (p ou q) ⇔ não p ou não q'],
            resposta: 'não (p e q) ⇔ não p ou não q',
            dificuldade: 'dificil',
            explicacao: 'A negação de uma conjunção é a disjunção das negações: ¬(p ∧ q) ⇔ (¬p ∨ ¬q).'
        },
        {
            pergunta: 'A contrapositiva de "Se chove, então fico em casa" é:',
            opcoes: ['Se não chove, então não fico em casa', 'Se fico em casa, então chove', 'Se não fico em casa, então não chove'],
            resposta: 'Se não fico em casa, então não chove',
            dificuldade: 'dificil',
            explicacao: 'A contrapositiva de (p → q) é (¬q → ¬p), trocando a ordem e negando ambas as partes.'
        },
        {
            pergunta: 'Quantas linhas tem a tabela verdade para uma proposição com 3 variáveis (p,q,r)?',
            opcoes: ['6', '4', '8'],
            resposta: '8',
            dificuldade: 'medio',
            explicacao: 'O número de linhas é 2 elevado ao número de variáveis (n). Portanto, 2³ = 8.'
        },
        {
            pergunta: 'A expressão "(p ou q) e não (p e q)" define qual conectivo?',
            opcoes: ['Conjunção', 'Disjunção exclusiva', 'Bicondicional'],
            resposta: 'Disjunção exclusiva',
            dificuldade: 'dificil',
            explicacao: 'Esta é a definição da disjunção exclusiva (ou "ou exclusivo", p ⊕ q), que é verdadeira apenas quando uma das proposições é verdadeira, mas não ambas.'
        },
    ];

    // --- ESTADO DO JOGO ---
    let state = {};

    function initState() {
        state = {
            playerName: '',
            score: 0,
            currentQuestionIndex: 0,
            shuffledQuestions: [],
            timerInterval: null,
            timeLeft: 0,
            questionStartTime: 0,
        };
    }
    
    const TIME_PER_QUESTION = 15;

    // --- FUNÇÕES AUXILIARES ---
    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

    // --- FUNÇÕES DE CONTROLE DE TELA ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hide'));
        
        document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(`nav-${screenName}`);
        if (activeLink) activeLink.classList.add('active');

        if (screenName === 'ranking') {
            endTitle.innerText = "Ranking dos Melhores";
            endFeedbackText.innerText = "Veja os melhores jogadores até agora!";
            finalScoreElement.parentElement.classList.add('hide');
            restartButton.classList.add('hide');
            goHomeButton.classList.remove('hide');
            loadRanking();
            screens.end.classList.remove('hide');
        } else {
            screens[screenName].classList.remove('hide');
        }
        
        // Fecha a sidebar em telas pequenas ao navegar
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('open');
        }
    }

    // --- LÓGICA DO JOGO ---
    function startGame() {
        state.playerName = playerNameInput.value.trim() || 'Anônimo';
        initState(); // Reinicia o estado, mas mantém o nome do jogador
        state.playerName = playerNameInput.value.trim() || 'Anônimo'; // Reaplica o nome
        state.shuffledQuestions = shuffleArray(questions);

        scoreElement.innerText = state.score;
        showScreen('quiz');
        loadNextQuestion();
    }

    function loadNextQuestion() {
        resetForNextQuestion();
        if (state.currentQuestionIndex >= state.shuffledQuestions.length) {
            endGame();
            return;
        }

        const question = state.shuffledQuestions[state.currentQuestionIndex];
        questionElement.innerText = question.pergunta;
        
        const shuffledOptions = shuffleArray(question.opcoes);
        shuffledOptions.forEach(opcao => {
            const button = document.createElement('button');
            button.innerText = opcao;
            button.classList.add('option');
            button.addEventListener('click', () => selectAnswer(button, question));
            optionsContainer.appendChild(button);
        });

        questionCounter.innerText = `${state.currentQuestionIndex + 1}/${state.shuffledQuestions.length}`;
        progressBar.style.width = `${((state.currentQuestionIndex) / state.shuffledQuestions.length) * 100}%`;

        startTimer();
    }
    
    function resetForNextQuestion() {
        clearInterval(state.timerInterval);
        optionsContainer.innerHTML = '';
        feedbackText.innerText = '';
        nextButton.classList.add('hide');
    }

    function startTimer() {
        state.timeLeft = TIME_PER_QUESTION;
        state.questionStartTime = Date.now();
        timerBarInner.style.transition = 'none';
        timerBarInner.style.width = '100%';

        setTimeout(() => {
            timerBarInner.style.transition = `width ${TIME_PER_QUESTION}s linear`;
            timerBarInner.style.width = '0%';
        }, 100);

        state.timerInterval = setInterval(() => {
            if (state.timeLeft < 0) {
                clearInterval(state.timerInterval);
                selectAnswer(null, state.shuffledQuestions[state.currentQuestionIndex]);
            }
            state.timeLeft--;
        }, 1000);
    }

    function selectAnswer(selectedButton, question) {
        clearInterval(state.timerInterval);
        const timeTaken = (Date.now() - state.questionStartTime) / 1000;
        const isCorrect = selectedButton && selectedButton.innerText === question.resposta;

        Array.from(optionsContainer.children).forEach(button => {
            if (button.innerText === question.resposta) button.classList.add('correct');
            else if (button === selectedButton) button.classList.add('incorrect');
            button.disabled = true;
        });

        if (isCorrect) {
            const points = calculatePoints(question.dificuldade, timeTaken);
            state.score += points;
            scoreElement.innerText = state.score;
            feedbackText.innerText = `Correto! +${points} pontos`;
            feedbackText.style.color = 'var(--correct-color)';
        } else {
            feedbackText.innerText = selectedButton ? 'Incorreto!' : 'Tempo esgotado!';
            feedbackText.style.color = 'var(--incorrect-color)';
        }

        setTimeout(() => {
            feedbackText.innerText = `Explicação: ${question.explicacao}`;
            nextButton.classList.remove('hide');
        }, 2000);
    }
    
    function calculatePoints(difficulty, timeTaken) {
        const basePoints = { 'facil': 100, 'medio': 150, 'dificil': 200 };
        const timeBonus = Math.max(0, Math.round((TIME_PER_QUESTION - timeTaken) * 10));
        return basePoints[difficulty] + timeBonus;
    }

    function endGame() {
        progressBar.style.width = '100%';
        endTitle.innerText = "Fim de Jogo!";
        endFeedbackText.innerText = "Parabéns por concluir o desafio!";
        finalScoreElement.parentElement.classList.remove('hide');
        restartButton.classList.remove('hide');
        goHomeButton.classList.remove('hide');
        
        finalScoreElement.innerText = state.score;
        saveAndShowRanking();
        showScreen('end');
    }

    // --- LÓGICA DO RANKING ---
    function saveAndShowRanking() {
        const ranking = getRanking();
        ranking.push({ name: state.playerName, score: state.score });
        ranking.sort((a, b) => b.score - a.score);
        localStorage.setItem('quizRanking', JSON.stringify(ranking.slice(0, 5)));
        loadRanking();
    }

    function getRanking() {
        try {
            const ranking = JSON.parse(localStorage.getItem('quizRanking'));
            return Array.isArray(ranking) ? ranking : [];
        } catch (e) {
            return [];
        }
    }
    
    function loadRanking() {
        const ranking = getRanking();
        rankingList.innerHTML = '';
        if (ranking.length === 0) {
            rankingList.innerHTML = '<li>Ainda não há pontuações. Seja o primeiro!</li>';
        } else {
            ranking.forEach(entry => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${entry.name}</span><strong>${entry.score}</strong>`;
                rankingList.appendChild(li);
            });
        }
    }

    // --- INICIALIZAÇÃO E EVENTOS ---
    function init() {
        initState();
        showScreen('home');
        
        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', startGame);
        goHomeButton.addEventListener('click', () => showScreen('home'));
        navHome.addEventListener('click', (e) => { e.preventDefault(); showScreen('home'); });
        navRanking.addEventListener('click', (e) => { e.preventDefault(); showScreen('ranking'); });
        
        nextButton.addEventListener('click', () => {
            state.currentQuestionIndex++;
            loadNextQuestion();
        });
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    return { init };
})();

// Inicia a aplicação quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', QuizApp.init);