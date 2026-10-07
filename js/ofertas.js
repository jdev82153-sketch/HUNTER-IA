document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("ofertas-content");

    if (!container) return;

    container.innerHTML = `
        <div class="tool-panel">
            <div class="tool-intro">
                <span class="tool-badge">GERADOR DE OFERTAS</span>

                <h2>Transforme seu serviço em uma oferta mais atraente.</h2>

                <p>
                    Informe o que você vende e para quem. O Hunter IA
                    vai estruturar uma oferta mais clara e focada em
                    conversão.
                </p>
            </div>

            <div class="form-group">
                <label for="oferta-produto">
                    O que você vende?
                </label>

                <input
                    type="text"
                    id="oferta-produto"
                    placeholder="Ex: Landing Page profissional"
                >
            </div>

            <div class="form-group">
                <label for="oferta-publico">
                    Para quem você vende?
                </label>

                <input
                    type="text"
                    id="oferta-publico"
                    placeholder="Ex: Clínicas e profissionais da saúde"
                >
            </div>

            <div class="form-group">
                <label for="oferta-problema">
                    Qual problema você resolve?
                </label>

                <textarea
                    id="oferta-problema"
                    rows="5"
                    placeholder="Ex: A empresa não consegue apresentar seus serviços de forma profissional na internet."
                ></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="oferta-preco">
                        Preço atual
                    </label>

                    <input
                        type="text"
                        id="oferta-preco"
                        placeholder="Ex: R$ 497"
                    >
                </div>

                <div class="form-group">
                    <label for="oferta-prazo">
                        Prazo de entrega
                    </label>

                    <input
                        type="text"
                        id="oferta-prazo"
                        placeholder="Ex: 5 dias"
                    >
                </div>
            </div>

            <button id="gerar-oferta" class="primary-button">
                Gerar oferta
            </button>

            <div id="oferta-result" class="ai-result hidden"></div>
        </div>
    `;

    const produto = document.getElementById("oferta-produto");
    const publico = document.getElementById("oferta-publico");
    const problema = document.getElementById("oferta-problema");
    const preco = document.getElementById("oferta-preco");
    const prazo = document.getElementById("oferta-prazo");

    const button = document.getElementById("gerar-oferta");
    const result = document.getElementById("oferta-result");

    button.addEventListener("click", () => {
        const produtoTexto = produto.value.trim();
        const publicoTexto = publico.value.trim();
        const problemaTexto = problema.value.trim();

        const precoTexto = preco.value.trim() || "Consulte o valor";
        const prazoTexto = prazo.value.trim() || "Prazo combinado";

        if (!produtoTexto || !publicoTexto || !problemaTexto) {
            result.className = "ai-result error";

            result.innerHTML = `
                <strong>Preencha os campos principais.</strong>

                <p>
                    Informe o produto, público e problema que sua
                    oferta resolve.
                </p>
            `;

            return;
        }

        button.disabled = true;
        button.textContent = "Criando oferta...";

        result.className = "ai-result";

        result.innerHTML = `
            <div class="loading-result">
                <span></span>
                <span></span>
                <span></span>

                <p>
                    Estruturando sua oferta...
                </p>
            </div>
        `;

        setTimeout(() => {
            result.innerHTML = `
                <div class="result-header">
                    <span class="tool-badge">
                        OFERTA GERADA
                    </span>

                    <h3>
                        ${produtoTexto}
                    </h3>
                </div>

                <div class="strategy-section">
                    <h4>🔥 Título da oferta</h4>

                    <div class="copy-box">
                        ${produtoTexto} profissional
                        para ${publicoTexto}, criado para
                        melhorar sua presença e gerar mais
                        oportunidades de negócio.
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>🎯 Problema</h4>

                    <p>
                        Seu cliente enfrenta:
                    </p>

                    <div class="copy-box">
                        ${problemaTexto}
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>💎 Proposta de valor</h4>

                    <p>
                        Em vez de vender apenas ${produtoTexto},
                        apresente a transformação:
                    </p>

                    <div class="copy-box">
                        “Tenha uma solução profissional pensada
                        para ${publicoTexto}, com foco em apresentar
                        seu negócio de forma clara e transformar
                        visitantes em novas oportunidades.”
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>📦 O que está incluso</h4>

                    <ul class="offer-list">
                        <li>✓ Desenvolvimento personalizado</li>
                        <li>✓ Estrutura profissional</li>
                        <li>✓ Otimização para celular</li>
                        <li>✓ Organização focada em conversão</li>
                        <li>✓ Suporte durante a entrega</li>
                    </ul>
                </div>

                <div class="strategy-section">
                    <h4>💰 Investimento</h4>

                    <div class="price-highlight">
                        <strong>${precoTexto}</strong>

                        <span>
                            Entrega estimada: ${prazoTexto}
                        </span>
                    </div>
                </div>

                <div class="strategy-section">
                    <h4>🚀 Chamada para ação</h4>

                    <div class="copy-box">
                        “Se fizer sentido para você, podemos
                        começar ainda hoje. Posso te explicar
                        rapidamente como funciona e já deixar
                        tudo encaminhado.”
                    </div>
                </div>

                <div class="strategy-summary">
                    <strong>Público:</strong> ${publicoTexto}<br>
                    <strong>Produto:</strong> ${produtoTexto}<br>
                    <strong>Preço:</strong> ${precoTexto}<br>
                    <strong>Prazo:</strong> ${prazoTexto}
                </div>
            `;

            result.classList.add("show");

            button.disabled = false;
            button.textContent = "Gerar nova oferta";
        }, 900);
    });
});
