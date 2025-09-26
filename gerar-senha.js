// API simples para gerar senha de atendimento
// Importa o dotenv para carregar as variáveis do arquivo .env
require('dotenv').config();

let contadorSenhas = 0;
let senhasCriadas = [];
let senhasChamadas = [];

function gerarSenha(req, res) {
    const novaSenha = `S${senhasCriadas.length + senhasChamadas.length + 1}`;
    senhasCriadas.push(novaSenha);
    res.json({ senha: novaSenha });
}

// Exemplo para uso com Express.js:
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(__dirname));

app.get('/api/gerar-senha', gerarSenha);

app.get('/api/senhas-criadas', (req, res) => {
    res.json({ senhas: senhasCriadas });
});

app.get('/api/senhas-chamadas', (req, res) => {
    res.json({ senhas: senhasChamadas });
});

app.get('/api/chamar-senha', (req, res) => {
    if (senhasCriadas.length > 0) {
        const senha = senhasCriadas.shift();
        senhasChamadas.push(senha);
        res.json({ senha });
    } else {
        res.json({ senha: null });
    }
});

app.get('/cliente.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cliente.html'));
});

app.listen(port, () => {
    console.log(`API de senhas rodando em http://localhost:${port}/api/gerar-senha`);
});

module.exports = gerarSenha;