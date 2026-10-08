/* =========================================================
   HUNTER IA — CALCULADORA.JS
   Calculadora de preços para serviços digitais
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const servico =
        document.getElementById("calc-servico");

    const custo =
        document.getElementById("calc-custo");

    const margem =
        document.getElementById("calc-margem");

    const botao =
        document.getElementById("calc-gerar");

    const resultado =
        document.getElementById("calc-result");


    if (
        !servico ||
        !custo ||
        !margem ||
        !botao ||
        !resultado
    ) {
        return;
    }


    /* =====================================================
       CALCULAR
       ===================================================== */

    botao.addEventListener("click", () => {

        const custoValor =
            Number(custo.value);

        const margemValor =
            Number(margem.value);


        if (
            !Number.isFinite(custoValor) ||
            custoValor <= 0
        ) {

            mostrarResultado(
                "Digite um custo válido maior que R$ 0,00."
            );

            return;
        }


        if (
            !Number.isFinite(margemValor) ||
            margemValor < 0
        ) {

            mostrarResultado(
                "Digite uma margem de lucro válida."
            );

            return;
        }


        const preco =
            custoValor *
            (1 + margemValor / 100);


        const lucro =
            preco - custoValor;


        const nomeServico =
            obterNomeServico(
                servico.value
            );


        const precoFormatado =
            formatarMoeda(preco);

        const custoFormatado =
            formatarMoeda(custoValor);

        const lucroFormatado =
            formatarMoeda(lucro);


        mostrarResultado(
`RESULTADO DA CALCULADORA

Serviço: ${nomeServico}

Custo estimado:
${custoFormatado}

Margem de lucro:
${margemValor}%

Preço sugerido:
${precoFormatado}

Lucro estimado:
${lucroFormatado}

━━━━━━━━━━━━━━━━━━━━

DICA DO HUNTER IA

Esse valor é uma referência baseada apenas no seu custo e na margem informada.

Antes de enviar o preço ao cliente, considere também:

• Complexidade do projeto
• Tempo de desenvolvimento
• Valor percebido pelo cliente
• Urgência
• Revisões
• Manutenção
• Resultado que o serviço pode gerar

Não venda somente pelo seu custo. Venda pelo valor da solução.`
        );

    });


    /* =====================================================
       ENTER
       ===================================================== */

    [custo, margem].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();

                botao.click();

            }

        });

    });


    /* =====================================================
       NOME DO SERVIÇO
       ===================================================== */

    function obterNomeServico(valor) {

        const nomes = {

            landing:
                "Landing Page",

            site:
                "Site",

            loja:
                "Loja Virtual",

            automacao:
                "Automação",

            outro:
                "Outro serviço"

        };

        return nomes[valor] || "Serviço digital";

    }


    /* =====================================================
       FORMATA MOEDA
       ===================================================== */

    function formatarMoeda(valor) {

        return valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    /* =====================================================
       RESULTADO
       ===================================================== */

    function mostrarResultado(texto) {

        resultado.classList.remove("hidden");

        resultado.textContent =
            texto;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

});
