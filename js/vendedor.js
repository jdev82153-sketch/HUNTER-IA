document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("vendedor-content");

    if (!container) return;

    container.innerHTML = `
        <div class="tool-panel">
            <div class="tool-intro">
                <span class="tool-badge">VENDEDOR IA</span>

                <h2>Transforme uma situação em uma estratégia de venda.</h2>

                <p>
                    Conte o que está acontecendo com seu cliente e receba
                    uma estratégia para abordar, responder objeções,
                    fazer follow-up e fechar a venda.
                </p>
            </div>

            <div class="form-group">
                <label for="vendedor-situacao">
                    O que está acontecendo?
                </label>

                <textarea
                    id="vendedor-situacao"
                    rows="7"
                    placeholder="Exemplo: Tenho uma empresa interessada em criar um site, mas o cliente disse que precisa pensar no preço..."
                ></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="vendedor-produto">
                        O que você está vendendo?
                    </label>

                    <input
                        type="text"
                        id="vendedor-produto"
                        placeholder="Ex: Landing Page"
                    >
                </div>

                <div class="form-group">
                    <label for="vendedor-valor">
                        Valor da oferta
                    </label>

                    <input
                        type="text"
                        id="vendedor-valor"
                        placeholder="Ex: R$ 497"
                    >
                </div>
            </div>

            <button id="gerar-estrategia" class="primary-button">
                Gerar estratégia de venda
            </button>

            <div id="vendedor-result" class="ai-result hidden"></div>
        </div>
    `;

    const situacao = document.getElementById("vendedor-situacao");
    const produto = document.getElementById("vendedor-produto");
    const valor = document.getElementById("vendedor-valor");
    const button = document.getElementById("gerar-estrategia");
    const result = document.getElementById("vendedor-result");

    button.addEventListener("click", () => {
        const situacaoTexto = situacao.value.trim();
        const produtoTexto = produto.value.trim() || "seu produto ou serviço";
        const valorTexto = valor.value.trim() || "o valor apresentado";

        if (!situacaoTexto) {
            result.className = "ai-result error";
            result.innerHTML = `
                <strong>Preencha a situação.</strong>
                <p>Explique o que aconteceu com o cliente para o Hunter IA criar a estratégia.</p>
            `;
            return;
        }

        button.disabled = true;
        button.textContent = "Analisando...";

        result.className = "ai-result";
        result.innerHTML = `
            <div class="loading-result">
                <span></span>
                <span></span>
                <span></span>
                <p>Montando sua estratégia de venda...</p>
            </div>
        `;

        setTimeout(() => {
            result.innerHTML = `
                <div class="result-header">
                    <span class="tool-badge">ESTRATÉGIA GERADA</span>
                    <h3>Plano para vender ${produtoTexto}</h3>
                </div>

                <div class="strategy-section">
                    <h4>1. Abordagem</h4>

                    <p>
                        Não tente vender imediatamente. Primeiro mostre que
                        você entendeu o problema do cliente.
                    </p>

                    <div class="copy-box">
                        “Entendi. Antes de falarmos apenas sobre preço,
                        quero entender exatamente o que você precisa para
                        eu te mostrar a melhor opção.”
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>2. Como apresentar o valor</h4>

                    <p>
                        Apresente o resultado que o cliente pode obter,
                        e não apenas as características do serviço.
                    </p>

                    <div class="copy-box">
                        “A ideia não é simplesmente te entregar ${produtoTexto}.
                        É criar algo que apresente sua empresa de forma
                        profissional e ajude você a transformar visitantes
                        em possíveis clientes.”
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>3. Se o cliente disser que está caro</h4>

                    <div class="copy-box">
                        “Entendo. Para eu conseguir te ajudar melhor,
                        o que exatamente fez você sentir que o investimento
                        ficou acima do esperado?”
                    </div>

                    <p>
                        Faça essa pergunta e deixe o cliente explicar
                        a verdadeira objeção antes de oferecer desconto.
                    </p>
                </div>

                <div class="strategy-section">
                    <h4>4. Follow-up</h4>

                    <div class="copy-box">
                        “Oi! Passando para saber se conseguiu analisar
                        nossa proposta. Se ficou alguma dúvida ou se
                        quiser ajustar algum ponto, posso te ajudar.”
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>5. Fechamento</h4>

                    <div class="copy-box">
                        “Se estiver tudo certo para você, podemos começar
                        hoje. Posso confirmar os próximos passos?”
                    </div>
                </div>

                <div class="strategy-summary">
                    <strong>Oferta:</strong> ${produtoTexto}<br>
                    <strong>Valor informado:</strong> ${valorTexto}<br>
                    <strong>Objetivo:</strong> conduzir o cliente até o fechamento.
                </div>
            `;

            result.classList.add("show");

            button.disabled = false;
            button.textContent = "Gerar estratégia novamente";
        }, 900);
    });
});
