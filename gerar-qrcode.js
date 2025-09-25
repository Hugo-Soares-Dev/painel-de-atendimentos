require('dotenv').config();
// Script simples para gerar um QR Code que aponta para a URL do cliente

const QRCode = require('qrcode');

const url = process.env.BASE_URL || "http://localhost:3000/cliente.html"; // Troque pela sua URL real

QRCode.toFile('qrcode.png', url, function (err) {
    if (err) throw err;
    console.log(`QR Code gerado para a URL: ${url}`);
    console.log("O arquivo se chama qrcode.png");
});