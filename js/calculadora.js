document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("calculadora-content");

    if (!container) return;

    container.innerHTML = `
        <div class="tool-panel">
            <div class="tool-intro">
                <span class="tool-badge">CALCULADORA DE PREÇOS</span>

                <h2>Descubra quanto cobrar pelo seu serviço.</h2>

                <p>
                    Informe o tipo de projeto, nível de complexidade e
                    prazo para chegar a uma sugestão de preço.
                </p>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="calc-servico">Tipo de serviço</label>

                    <select id="calc-servico">
                        <option value="landing">Landing Page</option>
                        <option value="site">Site profissional</option>
                        <option value="loja">Loja virtual</option>
                        <option value="automacao">Automação</option>
                        <option value="chatbot">Chatbot</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="calc-complexidade">Complexidade</label>

                    <select id="calc-complexidade">
                        <option value="1">Básica</option>
                        <option value="1.5">Intermediária</option>
                        <option value="2">Avançada</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="calc-horas">Horas estimadas</label>

                    <input
                        type="number"
                        id="calc-horas"
                        min="1"
                        value="5"
                        placeholder="Ex: 10"
                    >
                </div>

                <div class="form-group">
                    <label for="calc-hora">Valor da sua hora</label>

                    <input
                        type="number"
                        id="calc-hora"
                        min="1"
                        value="30"
                        placeholder="Ex: 50"
                    >
                </div>
            </div>

            <div class="form-group">
                <label for="calc-custos">Custos extras</label>

                <input
                    type="number"
                    id="calc-custos"
                    min="0"
                    value="0"
                    placeholder="Ex: 50"
                >
            </div>

            <button id="calcular-preco" class="primary-button">
                Calcular preço
            </button>

            <div id="calculadora-result" class="ai-result hidden"></div>
        </div>
    `;

    const servico = document.getElementById("calc-servico");
    const complexidade = document.getElementById("calc-complexidade");
    const horas = document.getElementById("calc-horas");
    const valorHora = document.getElementById("calc-hora");
    const custos = document.getElementById("calc-custos");
    const button = document.getElementById("calcular-preco");
    const result = document.getElementById("calculadora-result");

    const nomesServicos = {
        landing: "Landing Page",
        site: "Site profissional",
        loja: "Loja virtual",
        automacao: "Automação",
        chatbot: "Chatbot"
    };

    button.addEventListener("click", () => {
        const horasValue = Number(horas.value);
        const horaValue = Number(valorHora.value);
        const custosValue = Number(custos.value);
        const multiplicador = Number(complexidade.value);

        if (
            !horasValue ||
            horasValue <= 0 ||
            !horaValue ||
            horaValue <= 0
        ) {
            result.className = "ai-result error";

            result.innerHTML = `
                <strong>Preencha os valores corretamente.</strong>
                <p>
                    Informe pelo menos as horas estimadas e o valor
                    da sua hora.
                </p>
            `;

            return;
        }

        const custoBase = horasValue * horaValue;
        const custoComplexidade = custoBase * multiplicador;
        const custoTotal = custoComplexidade + custosValue;

        const margem = custoTotal * 0.35;
        const precoSugerido = custoTotal + margem;

        const precoMinimo = precoSugerido * 0.85;
        const precoPremium = precoSugerido * 1.25;

        const formatar = (valor) => {
            return valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        };

        result.className = "ai-result";

        result.innerHTML = `
            <div class="result-header">
                <span class="tool-badge">RESULTADO</span>

                <h3>
                    ${nomesServicos[servico.value]}
                </h3>
            </div>

            <div class="price-grid">

                <div class="price-card">
                    <span>Preço mínimo</span>
                    <strong>${formatar(precoMinimo)}</strong>
                    <small>
                        Evite cobrar abaixo disso.
                    </small>
                </div>

                <div class="price-card featured">
                    <span>Preço recomendado</span>
                    <strong>${formatar(precoSugerido)}</strong>
                    <small>
                        Melhor equilíbrio entre preço e margem.
                    </small>
                </div>

                <div class="price-card">
                    <span>Preço premium</span>
                    <strong>${formatar(precoPremium)}</strong>
                    <small>
                        Para uma oferta mais completa.
                    </small>
                </div>

            </div>

            <div class="strategy-section">
                <h4>Resumo do cálculo</h4>

                <p>
                    <strong>Horas:</strong> ${horasValue}h
                </p>

                <p>
                    <strong>Valor/hora:</strong> ${formatar(horaValue)}
                </p>

                <p>
                    <strong>Custos extras:</strong> ${formatar(custosValue)}
                </p>

                <p>
                    <strong>Custo calculado:</strong> ${formatar(custoTotal)}
                </p>
            </div>

            <div class="strategy-section">
                <h4>💡 Estratégia</h4>

                <p>
                    Não apresente apenas o preço. Mostre primeiro o
                    resultado que o cliente receberá e depois apresente
                    o investimento.
                </p>
            </div>
        `;

        result.classList.add("show");
    });
});
