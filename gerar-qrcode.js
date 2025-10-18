// Linha 1: Mantém a importação do dotenv
require("dotenv").config();

// Linha 4: Mantém a importação do QR Code
const QRCode = require("qrcode");



// 1. Define a URL Base de Produção (domínio principal do Render)
const BASE_URL_PRODUCAO = "https://paineldeatendimento.onrender.com";

// 2. Define o caminho do arquivo (o destino que o QR code deve acessar)
const PATH_CLIENTE = "/cliente.html";

// 3. Constrói a URL final:
//    - Usa process.env.BASE_URL (que será localhost:porta em dev)
//    - OU usa a URL de produção (BASE_URL_PRODUCAO) se a variável não estiver definida (como no Render, a menos que você a configure lá).
//    - E adiciona o caminho do cliente.
const URL_BASE = process.env.BASE_URL || BASE_URL_PRODUCAO;
const URL_FINAL = URL_BASE + PATH_CLIENTE;

console.log(`URL final que será codificada: ${URL_FINAL}`);

// Linha 8: Usa a URL_FINAL no método toFile()
QRCode.toFile("qrcode.png", URL_FINAL, function (err) {
  if (err) throw err;
  console.log(`QR code gerado para a URL: ${URL_FINAL}`);
  console.log("O arquivo se chama qrcode.png");
});

// Linha 9: Mantém a exportação da função (mesmo que não seja usada aqui)
