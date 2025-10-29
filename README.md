# 🚀 Painel de Atendimento Digitalizado & Acessível

Seja bem-vindo ao **Painel de Atendimento Digitalizado**, um protótipo web projetado para modernizar e tornar mais acessível a gestão de filas em qualquer ambiente de recepção.

Este projeto cumpre um duplo papel: **eliminar o uso de papel** (digitalização) e fornecer uma **interface de alto contraste** com acessibilidade sonora.

---

## ✨ Destaques e Funcionalidades

| Recurso | Descrição | Status |
| :--- | :--- | :--- |
| **Geração de Senha via QR Code** | O cliente escaneia o QR Code para gerar sua senha no próprio celular, eliminando a impressão de papel e promovendo a digitalização. | ✅ Implementado (`gerar-qrcode.js`) |
| **Autonomia de Fila** | O estado da fila (senhas criadas/chamadas) é salvo no `Local Storage` do navegador (na TV), tornando o painel autônomo e persistente contra falhas de servidor. | ✅ Implementado (`painel.js`) |
| **Acessibilidade Visual** | Uso de uma paleta de cores de **Alto Contraste** (Fundo Claro / Texto Preto / Destaques Ciano e Verde-Limão) para máxima legibilidade e conformidade com normas. | ✅ Implementado (`style.css`) |
| **Acessibilidade Sonora** | Utiliza a API `SpeechSynthesis` do navegador para **falar a senha chamada** em português, auxiliando usuários com baixa visão ou deficiência visual. | ✅ Implementado (`painel.js`) |
| **Design Responsivo** | Layout baseado em Grid e Flexbox para adaptação a diferentes tamanhos de TV ou monitores. | ✅ Implementado (`style.css`) |

---

## ⚙️ Arquitetura do Projeto (Local Storage Model)

O projeto utiliza **Node.js/Express** para servir os arquivos e gerar o QR Code inicialmente, mas a lógica de estado das filas é totalmente **Client-Side (Local Storage)** para garantir a estabilidade.

* **`index.html` & `style.css`**: Interface principal com alto contraste.
* **`painel.js`**: O "cérebro" do painel. Gerencia o `Local Storage` para persistência da fila, atualiza a interface e executa a função de voz (`falarSenha`).
* **`gerar-qrcode.js`**: Script Node que codifica a URL do painel (`cliente.html`) no arquivo `qrcode.png`.
* **`gerar-senha.js`**: Servidor Express. Simplesmente serve os arquivos estáticos, sem manter o estado da fila na memória.

---

## 🚀 Capacidade e Possíveis Melhorias

O projeto é robusto para uso local/piloto, mas tem espaço para evoluir para uma aplicação de produção:

### 1. Migração para Armazenamento Persistente

* O estado da fila é mantido no `Local Storage` do navegador da TV. **Se o cache for limpo, a fila é perdida.**
* **Melhoria Sugerida:** Mover a lógica de estado para um banco de dados (ex: MongoDB ou PostgreSQL) e reintroduzir uma API robusta para sincronizar o estado entre múltiplos painéis e clientes.

### 2. Aperfeiçoamento do UX/UI

* **Localização de Atendente:** Adicionar a funcionalidade de guichês para direcionar o cliente que está sendo chamado.

---

## 🛠️ Como Iniciar o Projeto (Protótipo)

O projeto requer Node.js para rodar os scripts de inicialização e o servidor web.

1.  **Clone o Repositório:**
    ```bash
    git clone [https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github](https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
    cd painel-de-atendimento
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o Servidor:**
    ```bash
    npm start
    ```
    (Este comando irá gerar o `qrcode.png` e iniciar o servidor Express na porta 3000 ou na porta definida pelo Render.)

4.  **Acesse:** Abra o navegador em `http://localhost:3000/index.html`.

> ⚠️ **Observação sobre o Protótipo no Render:** Este projeto está hospedado em um plano gratuito do Render. Devido às limitações de servidor (que podem hibernar), o painel pode apresentar latência na primeira interação. Em um ambiente de produção real, é essencial usar uma solução de hospedagem dedicada.

---
