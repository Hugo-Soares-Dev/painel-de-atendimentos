// 1. CARREGA AS VARIÁVEIS DE AMBIENTE (do arquivo .env)
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const QRCode = require("qrcode"); // Importa a biblioteca de QR Code

// 2. DEFINE VARIÁVEIS GLOBAIS DE ESTADO (as filas de senhas)
let senhasCriadas = [];
let senhasChamadas = [];

// 3. DEFINE A PORTA E A URL BASE
// Prioriza a variável de ambiente (BASE_URL) ou usa um fallback local
const port = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

// Verifica se a BASE_URL está configurada
if (!BASE_URL) {
  console.error("ERRO: A variável de ambiente BASE_URL não está configurada!");
  console.error(
    "Por favor, verifique se o arquivo .env existe ou se a variável está no painel do Render."
  );
  // Termina a aplicação se não houver URL para evitar QR Code quebrado
  process.exit(1);
}

// 4. FUNÇÕES DA API DE SENHAS
function gerarSenha(req, res) {
  // A senha agora deve garantir que não haja repetição, usando o tamanho atual das duas filas.
  const novaSenha = `S${senhasCriadas.length + senhasChamadas.length + 1}`;
  senhasCriadas.push(novaSenha);
  res.json({ senha: novaSenha });
  console.log(`Senha gerada: ${novaSenha}`);
}

// 5. CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS E ROTAS

// Serve arquivos estáticos da raiz do projeto (index.html, style.css, etc.)
app.use(express.static(__dirname));

// Rota para GERAÇÃO DE SENHA (consumida pelo cliente.html)
app.get("/api/gerar-senha", gerarSenha);

// Rota para CHAMAR SENHA (consumida pelo painel de atendimento)
app.get("/api/chamar-senha", (req, res) => {
  if (senhasCriadas.length > 0) {
    const senha = senhasCriadas.shift();
    senhasChamadas.push(senha);
    console.log(`Senha chamada: ${senha}`);
    res.json({ senha });
  } else {
    res.json({ senha: null });
  }
});

// Rotas para visualização das filas (opcional)
app.get("/api/senhas-criadas", (req, res) => {
  res.json({ senhas: senhasCriadas });
});

app.get("/api/senhas-chamadas", (req, res) => {
  res.json({ senhas: senhasChamadas });
});

// 6. ROTA DINÂMICA DO QR CODE (A GRANDE SOLUÇÃO)
app.get("/api/qrcode", (req, res) => {
  // 6a. Constrói a URL de destino: BASE_URL + arquivo cliente.html
  const targetUrl = `${BASE_URL}/cliente.html`;

  // 6b. Configura o cabeçalho para retornar uma imagem PNG
  res.setHeader("Content-Type", "image/png");

  // 6c. Gera o QR Code e envia diretamente como resposta HTTP
  QRCode.toBuffer(targetUrl, { type: "png", margin: 1 }, (err, buffer) => {
    if (err) {
      console.error("Erro ao gerar QR Code:", err);
      return res.status(500).send("Erro interno ao gerar QR Code.");
    }
    // Envia o buffer (dados binários da imagem)
    res.end(buffer);
  });
  console.log(`QR Code dinâmico gerado para: ${targetUrl}`);
});

// 7. ROTA DE ARQUIVO HTML (IMPORTANTE: A rota deve ser exata)
// Garante que o servidor sirva cliente.html
app.get("/cliente.html", (req, res) => {
  res.sendFile(path.join(__dirname, "cliente.html"));
});

// Rota de fallback para a página principal (opcional, pode ser o painel.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 8. INICIA O SERVIDOR
app.listen(port, () => {
  console.log(`API de senhas rodando em http://localhost:${port}/`);
  console.log(`URL Pública: ${BASE_URL}`);
  console.log(`Link do QR Code Dinâmico: ${BASE_URL}/api/qrcode`);
}
);