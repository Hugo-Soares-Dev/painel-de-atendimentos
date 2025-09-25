let senhasCriadas = [];
let senhasChamadas = [];
let senhaAtual = null;
let contadorSenhas = 0;

const listaSenhasCriadas = document.getElementById('lista-senhas-criadas');
const listaSenhasChamadas = document.getElementById('lista-senhas-chamadas');
const senhaChamada = document.getElementById('senha-chamada');
const btnGerarSenha = document.getElementById('btn-gerar-senha');
const btnChamarSenha = document.getElementById('btn-chamar-senha');

function atualizarListas() {
    fetch('/api/senhas-criadas')
        .then(res => res.json())
        .then(data => {
            // Mostra só as 3 primeiras senhas a serem chamadas
            const proximas = data.senhas.slice(0, 3);
            listaSenhasCriadas.innerHTML = proximas.map(s => `<li>${s}</li>`).join('');
        });

    fetch('/api/senhas-chamadas')
        .then(res => res.json())
        .then(data => {
            // Mostra só as 3 últimas senhas atendidas
            const ultimasChamadas = data.senhas.slice(-3);
            listaSenhasChamadas.innerHTML = ultimasChamadas.map(s => `<li>${s}</li>`).join('');
            senhaChamada.textContent = ultimasChamadas.length > 0 ? ultimasChamadas[ultimasChamadas.length - 1] : '';
        });
}

function falarSenha(texto) {
    if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(texto);
        utter.lang = 'pt-BR';
        window.speechSynthesis.speak(utter);
    }
}

btnGerarSenha?.addEventListener('click', () => {
    fetch('/api/gerar-senha')
        .then(() => atualizarListas());
});

btnChamarSenha?.addEventListener('click', () => {
    fetch('/api/chamar-senha')
        .then(res => res.json())
        .then(data => {
            atualizarListas();
            if (data.senha) {
                falarSenha(`Senha chamada: ${data.senha}`);
            }
        });
});

atualizarListas();
setInterval(atualizarListas, 2000);