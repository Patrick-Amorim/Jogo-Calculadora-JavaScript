let questaoAtual = {};
let score = 0;

const questao = document.getElementById('question');
const feedback = document.getElementById('feedback');
const pontuacao = document.getElementById('score');
const resultado = document.getElementById('resultado');

function gerarQuestao() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operacao = Math.random() > 0.5 ? '+' : '*'; //escolhe um número entre 0 ou 1, dependendo muda a operação

    questaoAtual = {
        question: `${num1} ${operacao} ${num2}`,
        answer: eval(`${num1} ${operacao} ${num2}`),
    };

    questao.innerText = `Resolva: ${questaoAtual.question}`;
    salvarEstado(); 
}

function insert(num) {
    resultado.innerHTML += num;
}

function clean() {
    resultado.innerHTML = "";
}


// recupera dados salvos ao carregar a página
window.onload = function () {
    const questaoSalva = localStorage.getItem('questaoAtual');
    const pontuacaoSalva = localStorage.getItem('score');

    if (questaoSalva && pontuacaoSalva !== null) {
        questaoAtual = JSON.parse(questaoSalva);
        score = parseInt(pontuacaoSalva);
        questao.innerText = `Resolva: ${questaoAtual.question}`;
        pontuacao.innerText = `Pontuação: ${score}`;
    } else {
        gerarQuestao();
    }
};


// salva dados no localStorage
function salvarEstado() {
    localStorage.setItem('questaoAtual', JSON.stringify(questaoAtual));
    localStorage.setItem('score', score);
}

function enviarResposta() {
    const respostaUsuario = parseFloat(resultado.innerHTML);
    if (respostaUsuario === questaoAtual.answer) {
        feedback.innerText = 'Correto!';
        feedback.style.color = 'green';
        score++;
    } else {
        feedback.innerHTML = `Errado!<br>Resposta correta: ${questaoAtual.answer}`;
        feedback.style.color = 'red';
        feedback.style.fontSize = '13pt';
        feedback.style.fontWeight = '100';
    }

    pontuacao.innerText = `Pontuação: ${score}`;
    clean();
    gerarQuestao(); 
    salvarEstado(); 
}

// função para limpar a pontuação
function clearScore() {
    score = 0; 
    localStorage.removeItem('questaoAtual'); 
    localStorage.removeItem('score'); 
    pontuacao.innerText = 'Pontuação: 0'; 
    feedback.innerText = ''; 
    clean(); 
    gerarQuestao(); 
}