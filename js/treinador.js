/* =========================================================
   HUNTER IA — TREINADOR.JS
   Treinador de vendas
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const resposta =
        document.getElementById("treinador-resposta");

    const botao =
        document.getElementById("treinador-enviar");

    const resultado =
        document.getElementById("treinador-result");


    if (
        !resposta ||
        !botao ||
        !resultado
    ) {
        return;
    }


    /* =====================================================
       ANALISAR RESPOSTA
       ===================================================== */

    botao.addEventListener("click", () => {

        const texto =
            resposta.value.trim();


        if (!texto) {

            mostrarResultado(
                "Digite a resposta que o cliente deu para começar o treinamento."
            );

            resposta.focus();

            return;
        }


        const analise =
            analisarResposta(texto);


        mostrarResultado(analise);

    });


    /* =====================================================
       ENTER
       ===================================================== */

    resposta.addEventListener("keydown", event => {

        if (
            event.key === "Enter" &&
            (event.ctrlKey || event.metaKey)
        ) {

            event.preventDefault();

            botao.click();

        }

    });


    /* =====================================================
       ANALISAR
       ===================================================== */

    function analisarResposta(texto) {

        const mensagem =
            texto.toLowerCase();


        let nivel =
            "Boa";

        let pontos = [];

        let melhorias = [];


        /* -------------------------------------------------
           IDENTIFICAÇÃO DE PONTOS
           ------------------------------------------------- */

        if (
            mensagem.includes("entendo") ||
            mensagem.includes("entendi") ||
            mensagem.includes("claro")
        ) {

            pontos.push(
                "Você demonstrou atenção ao que o cliente falou."
            );

        } else {

            melhorias.push(
                "Comece demonstrando que entendeu o que o cliente disse."
            );

        }


        if (
            mensagem.includes("porque") ||
            mensagem.includes("por que") ||
            mensagem.includes("problema") ||
            mensagem.includes("necessidade")
        ) {

            pontos.push(
                "Você tentou entender melhor a necessidade do cliente."
            );

        } else {

            melhorias.push(
                "Faça perguntas para descobrir o verdadeiro problema do cliente."
            );

        }


        if (
            mensagem.includes("posso") ||
            mensagem.includes("podemos") ||
            mensagem.includes("vamos")
        ) {

            pontos.push(
                "Você apresentou um próximo passo para a conversa."
            );

        } else {

            melhorias.push(
                "Tente conduzir o cliente para um próximo passo."
            );

        }


        if (
            mensagem.includes("site") ||
            mensagem.includes("serviço") ||
            mensagem.includes("solução") ||
            mensagem.includes("produto")
        ) {

            pontos.push(
                "Você conectou a conversa com sua solução."
            );

        } else {

            melhorias.push(
                "Mostre como sua solução pode ajudar especificamente o cliente."
            );

        }


        /* -------------------------------------------------
           DETECTAR ABORDAGEM MUITO AGRESSIVA
           ------------------------------------------------- */

        if (
            mensagem.includes("compre agora") ||
            mensagem.includes("feche agora") ||
            mensagem.includes("última chance") ||
            mensagem.includes("promoção acaba")
        ) {

            nivel =
                "Precisa melhorar";

            melhorias.push(
                "Evite pressionar o cliente logo no início da conversa."
            );

        }


        /* -------------------------------------------------
           MONTAR RESULTADO
           ------------------------------------------------- */

        let resultadoFinal =
`TREINAMENTO DE VENDAS — HUNTER IA

Mensagem analisada:

"${texto}"

━━━━━━━━━━━━━━━━━━━━

AVALIAÇÃO

Nível: ${nivel}

`;


        if (pontos.length > 0) {

            resultadoFinal +=
`
✅ O QUE VOCÊ FEZ BEM

`;

            pontos.forEach(ponto => {

                resultadoFinal +=
                    `• ${ponto}\n`;

            });

        }


        if (melhorias.length > 0) {

            resultadoFinal +=
`
━━━━━━━━━━━━━━━━━━━━

⚠️ O QUE PODE MELHORAR

`;

            melhorias.forEach(melhoria => {

                resultadoFinal +=
                    `• ${melhoria}\n`;

            });

        }


        resultadoFinal +=
`
━━━━━━━━━━━━━━━━━━━━

🎯 COMO O HUNTER RESPONDERIA

Uma resposta mais estratégica seria:

"Entendi. Para eu conseguir te orientar da melhor forma, posso te fazer algumas perguntas rápidas sobre o seu negócio?

Assim consigo entender exatamente o que você precisa e verificar se existe uma solução que realmente faça sentido para você."

━━━━━━━━━━━━━━━━━━━━

💡 DICA DO HUNTER IA

Uma boa venda não acontece quando você fala mais.

Ela acontece quando você entende melhor o cliente.

Faça perguntas.
Escute.
Identifique o problema.
Mostre a solução.
E conduza para o próximo passo.`;

        return resultadoFinal;

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
