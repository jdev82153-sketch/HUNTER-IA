document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("treinador-content");

    if (!container) return;

    container.innerHTML = `
        <div class="tool-panel">
            <div class="tool-intro">
                <span class="tool-badge">TREINADOR DE VENDAS</span>

                <h2>Treine sua abordagem antes de falar com o cliente.</h2>

                <p>
                    Simule uma conversa de vendas, responda ao cliente
                    e descubra onde você pode melhorar.
                </p>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="treino-produto">
                        O que você está vendendo?
                    </label>

                    <input
                        type="text"
                        id="treino-produto"
                        placeholder="Ex: Landing Page"
                    >
                </div>

                <div class="form-group">
                    <label for="treino-cliente">
                        Tipo de cliente
                    </label>

                    <input
                        type="text"
                        id="treino-cliente"
                        placeholder="Ex: Dono de clínica"
                    >
                </div>
            </div>

            <div class="form-group">
                <label for="treino-objetivo">
                    Qual seu objetivo?
                </label>

                <select id="treino-objetivo">
                    <option value="primeiro-contato">
                        Fazer primeiro contato
                    </option>

                    <option value="apresentacao">
                        Apresentar a oferta
                    </option>

                    <option value="objecao">
                        Contornar uma objeção
                    </option>

                    <option value="fechamento">
                        Tentar fechar a venda
                    </option>
                </select>
            </div>

            <button id="iniciar-treino" class="primary-button">
                Iniciar treinamento
            </button>

            <div id="treino-area" class="hidden"></div>
        </div>
    `;

    const produto = document.getElementById("treino-produto");
    const cliente = document.getElementById("treino-cliente");
    const objetivo = document.getElementById("treino-objetivo");

    const iniciarButton = document.getElementById("iniciar-treino");
    const area = document.getElementById("treino-area");

    let mensagens = [];
    let etapa = 0;

    iniciarButton.addEventListener("click", iniciarTreino);

    function iniciarTreino() {
        const produtoTexto = produto.value.trim() || "seu serviço";
        const clienteTexto = cliente.value.trim() || "cliente";

        mensagens = [];
        etapa = 0;

        area.className = "training-area";

        area.innerHTML = `
            <div class="training-header">
                <span class="tool-badge">
                    SIMULAÇÃO ATIVA
                </span>

                <h3>
                    Você está conversando com um ${clienteTexto}.
                </h3>

                <p>
                    Venda: <strong>${produtoTexto}</strong>
                </p>
            </div>

            <div id="chat-messages" class="chat-messages">
                <div class="chat-message client">
                    <span class="chat-label">CLIENTE</span>

                    <p>
                        Olá! Pode me explicar melhor o que você está
                        oferecendo?
                    </p>
                </div>
            </div>

            <div class="training-input">
                <textarea
                    id="resposta-vendedor"
                    rows="4"
                    placeholder="Digite como você responderia ao cliente..."
                ></textarea>

                <button
                    id="enviar-resposta"
                    class="primary-button"
                >
                    Enviar resposta
                </button>
            </div>

            <div id="treino-feedback"></div>
        `;

        const enviar = document.getElementById("enviar-resposta");

        enviar.addEventListener("click", avaliarResposta);
    }

    function avaliarResposta() {
        const respostaInput =
            document.getElementById("resposta-vendedor");

        const resposta = respostaInput.value.trim();

        if (!resposta) {
            respostaInput.focus();
            return;
        }

        mensagens.push(resposta);

        adicionarMensagem("vendedor", resposta);

        respostaInput.value = "";

        etapa++;

        setTimeout(() => {
            gerarRespostaCliente();
        }, 600);
    }

    function adicionarMensagem(tipo, texto) {
        const chat = document.getElementById("chat-messages");

        if (!chat) return;

        const mensagem = document.createElement("div");

        mensagem.className = `chat-message ${tipo}`;

        mensagem.innerHTML = `
            <span class="chat-label">
                ${tipo === "vendedor" ? "VOCÊ" : "CLIENTE"}
            </span>

            <p>${escapeHTML(texto)}</p>
        `;

        chat.appendChild(mensagem);

        chat.scrollTop = chat.scrollHeight;
    }

    function gerarRespostaCliente() {
        const objetivoAtual = objetivo.value;

        let resposta = "";

        if (etapa === 1) {
            resposta =
                "Entendi. Mas por que eu deveria contratar isso em vez de fazer de outra forma?";
        } else if (etapa === 2) {
            resposta =
                "Entendi seu ponto. Mas ainda estou preocupado com o preço.";
        } else if (etapa === 3) {
            resposta =
                "Certo. Preciso pensar um pouco antes de tomar uma decisão.";
        } else {
            finalizarTreino();
            return;
        }

        if (objetivoAtual === "fechamento" && etapa === 2) {
            resposta =
                "Gostei da proposta, mas você consegue melhorar um pouco esse valor?";
        }

        adicionarMensagem("cliente", resposta);

        if (etapa >= 3) {
            setTimeout(finalizarTreino, 1000);
        }
    }

    function finalizarTreino() {
        const feedback = document.getElementById("treino-feedback");

        if (!feedback) return;

        const score = calcularPontuacao();

        feedback.className = "training-feedback";

        feedback.innerHTML = `
            <div class="score-card">
                <span class="tool-badge">
                    AVALIAÇÃO FINAL
                </span>

                <div class="score-number">
                    ${score}/100
                </div>

                <h3>
                    ${getResultado(score)}
                </h3>

                <div class="feedback-section">
                    <h4>O que você fez bem</h4>

                    <p>
                        Você manteve a conversa ativa e respondeu
                        diretamente ao cliente.
                    </p>
                </div>

                <div class="feedback-section">
                    <h4>O que pode melhorar</h4>

                    <p>
                        Faça mais perguntas antes de tentar convencer.
                        Quanto melhor você entender o problema,
                        mais fácil será apresentar sua solução.
                    </p>
                </div>

                <button
                    id="novo-treino"
                    class="secondary-button"
                >
                    Fazer outro treinamento
                </button>
            </div>
        `;

        document
            .getElementById("novo-treino")
            .addEventListener("click", iniciarTreino);
    }

    function calcularPontuacao() {
        if (mensagens.length === 0) return 0;

        let pontos = 50;

        mensagens.forEach((mensagem) => {
            const texto = mensagem.toLowerCase();

            if (texto.length > 40) pontos += 8;

            if (
                texto.includes("?") ||
                texto.includes("como") ||
                texto.includes("qual") ||
                texto.includes("por que")
            ) {
                pontos += 8;
            }

            if (
                texto.includes("resultado") ||
                texto.includes("benefício") ||
                texto.includes("problema") ||
                texto.includes("solução")
            ) {
                pontos += 7;
            }
        });

        return Math.min(pontos, 100);
    }

    function getResultado(score) {
        if (score >= 90) {
            return "Excelente vendedor!";
        }

        if (score >= 75) {
            return "Muito bom! Está no caminho certo.";
        }

        if (score >= 60) {
            return "Bom começo. Dá para melhorar.";
        }

        return "Continue treinando. Você vai evoluir.";
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});
