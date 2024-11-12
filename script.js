let perguntas = [
    {
        pergunta: ' Qual é a forma correta da negação da proposição "Todos os pássaros podem voar"?',
        opcoes: [
            { texto: 'Nenhum pássaro pode voar', correto: false },
            { texto: 'Alguns pássaros não podem voar', correto: true },
            { texto: 'Todos os pássaros podem nadar', correto: false }
        ]
    },
    {
        pergunta: ' A proposição "Se p, então q" é falsa quando:',
        opcoes: [
            { texto: 'p é verdadeira e q é falsa', correto: true },
            { texto: 'p é falsa e q é verdadeira', correto: false },
            { texto: 'p e q são verdadeiras', correto: false }
        ]
    },
    {
        pergunta: ' Uma proposição é uma tautologia quando sempre resulta em verdadeiro, independentemente dos valores das partes que a compõem. Essa afirmação define uma tautologia?',
        opcoes: [
            { texto: 'Verdadeiro', correto: true },
            { texto: 'Falso', correto: false }
        ]
    },
    {
        pergunta: ' O que é uma proposição composta?',
        opcoes: [
            { texto: 'Uma proposição que não pode ser verdadeira', correto: false },
            { texto: 'Uma proposição formada por outras proposições', correto: true },
            { texto: 'Uma proposição que contém variáveis', correto: false }
        ]
    },
    {
        pergunta: ' O que é uma tabela verdade?',
        opcoes: [
            { texto: 'Um método para resolver equações', correto: false },
            { texto: 'Um gráfico de funções matemáticas', correto: false },
            { texto: 'Uma tabela que mostra todos os valores de verdade possíveis de uma proposição', correto: true }
        ]
    },
    {
        pergunta: ' A proposição "Não p ou q" é exatamente o mesmo que a proposição condicional "Se p, então q" em todas as situações possíveis. Essa afirmação está correta?',
        opcoes: [
            { texto: 'Verdadeiro', correto: true },
            { texto: 'Falso', correto: false }
        ]
    },
    {
        pergunta: ' Qual das opções abaixo representa uma contradição?',
        opcoes: [
            { texto: 'p e não p', correto: true },
            { texto: 'p ou não p', correto: false },
            { texto: 'p e q', correto: false }
        ]
    },
    {
        pergunta: ' A proposição "p se e somente se q" é verdadeira quando:',
        opcoes: [
            { texto: 'p é verdadeira e q é falsa', correto: false },
            { texto: 'p e q são ambas verdadeiras', correto: false },
            { texto: 'p e q são ambas verdadeiras ou ambas falsas', correto: true }
        ]
    },
    {
        pergunta: ' Se uma proposição p é falsa, então dizer que sua negação, "não p", também é falsa está correto?',
        opcoes: [
            { texto: 'Verdadeiro', correto: false },
            { texto: 'Falso', correto: true }
        ]
    },
    {
        pergunta: ' Qual das seguintes é uma equivalência lógica válida?',
        opcoes: [
            { texto: 'p e não p é equivalente a p ou não p', correto: false },
            { texto: 'não (p e q) é equivalente a não p ou não q', correto: true },
            { texto: 'p ou não p é equivalente a p ou q', correto: false }
        ]
    },
    {
        pergunta: ' Se p e q são proposições, qual das seguintes proposições é logicamente equivalente a "p implica q"?',
        opcoes: [
            { texto: 'não p ou q', correto: true },
            { texto: 'p e q', correto: false },
            { texto: 'p ou não q', correto: false }
        ]
    },
    {
        pergunta: ' A contrapositiva de "Se hoje chove, então não vou ao parque" seria "Se não vou ao parque, então hoje chove". Essa contrapositiva está correta?',
        opcoes: [
            { texto: 'Verdadeiro', correto: false },
            { texto: 'Falso', correto: true }
        ]
    },
    {
        pergunta: ' Em uma tabela verdade, quantas linhas são necessárias para uma proposição composta de 3 variáveis proposicionais?',
        opcoes: [
            { texto: '6 linhas', correto: false },
            { texto: '4 linhas', correto: false },
            { texto: '8 linhas', correto: true }
        ]
    },
    {
        pergunta: ' Dada a proposição composta "(p ou q) e não (p e q)", qual é o seu nome lógico?',
        opcoes: [
            { texto: 'Conjunção', correto: false },
            { texto: 'Disjunção exclusiva', correto: true },
            { texto: 'Bicondicional', correto: false }
        ]
    },
    {
        pergunta: ' Duas proposições são logicamente equivalentes se mantêm sempre o mesmo valor de verdade, qualquer que seja a situação. Isso define equivalência lógica?',
        opcoes: [
            { texto: 'Verdadeiro', correto: true },
            { texto: 'Falso', correto: false }
        ]
    }
];


let perguntaAtual = 0;
let acertos = 0;
let erros = 0;
let tempoRestante = 180; 
let timerInterval;

function iniciarQuiz() {
    iniciarTimer();
    carregarPergunta();
}

function iniciarTimer() {
    const timerDisplay = document.getElementById('timer');
    timerInterval = setInterval(() => {
        let minutos = Math.floor(tempoRestante / 60);
        let segundos = tempoRestante % 60;
        timerDisplay.innerText = `Tempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        
        if (tempoRestante === 0) {
            clearInterval(timerInterval);
            mostrarResultado();
        } else {
            tempoRestante--;
        }
    }, 1000);
}

function verificarResposta(botao, status) {
    if (status === 'correto') {
        botao.classList.add('correto');
        acertos++;
    } else {
        botao.classList.add('errado');
        erros++;
    }
    desabilitarOpcoes();
}


function desabilitarOpcoes() {
    const opcoes = document.querySelectorAll('.option');
    opcoes.forEach(opcao => {
        opcao.disabled = true;
    });
}
function verificarResposta(botao, status) {
    if (status === 'correto') {
        botao.classList.add('correto');
        acertos++;
    } else {
        botao.classList.add('errado');
        erros++;
        
        const opcoes = document.querySelectorAll('.option');
        opcoes.forEach(opcao => {
            if (opcao.innerText === perguntas[perguntaAtual].opcoes.find(op => op.correto).texto) {
                opcao.classList.add('correto');
            }
        });
    }
    desabilitarOpcoes();
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function carregarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    
    document.getElementById('question-number').innerText = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById('question').innerText = pergunta.pergunta;
    
    const opcoesContainer = document.querySelector('.options');
    opcoesContainer.innerHTML = '';

    pergunta.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.classList.add('option');
        botao.innerText = opcao.texto;
        botao.disabled = false;
        botao.classList.remove('correto', 'errado');
        botao.setAttribute('onclick', `verificarResposta(this, '${opcao.correto ? 'correto' : 'errado'}')`);
        
        opcoesContainer.appendChild(botao); 
    });
}

function mostrarResultado() {
    clearInterval(timerInterval); 
    const container = document.querySelector('.quiz-container');
    
    let feedback;
    if (acertos >= 12) {
        feedback = "Excelente! Você tem um ótimo conhecimento de lógica!";
    } else if (acertos >= 8) {
        feedback = "Bom trabalho! Você está no caminho certo com a lógica.";
    } else {
        feedback = "Continue praticando! A lógica pode ser difícil, mas você chega lá.";
    }
    
    container.innerHTML = `
        <h2>Fim do Quiz</h2>
        <p>Você acertou ${acertos} de ${perguntas.length} perguntas.</p>
        <p>Erros: ${erros}</p>
        <p>${feedback}</p>
        <button id="reiniciar-quiz" class="botao" onclick="reiniciarQuiz()">Reiniciar Quiz</button>
    `;
}
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const perguntasOriginal = [...perguntas];

function reiniciarQuiz() {
    const container = document.querySelector('.quiz-container');
    
    container.innerHTML = `
        <div id="question" class="question-text"></div>
        <div class="options"></div>
        <button id="proxima-pergunta" class="botao" onclick="proximaPergunta()">Próxima Pergunta</button>
    `;
    
    perguntaAtual = 0;
    acertos = 0;
    erros = 0;
    tempoRestante = 180;
    embaralharArray(perguntas);
    
    iniciarQuiz(); 
}


document.addEventListener('DOMContentLoaded', iniciarQuiz);
