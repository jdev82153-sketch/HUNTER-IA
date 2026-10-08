/* =========================================================
   HUNTER IA — VENDEDOR.JS
   Gerador de abordagens e respostas de vendas
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const produtoInput =
        document.getElementById("vendedor-produto");

    const clienteInput =
        document.getElementById("vendedor-cliente");

    const gerarButton =
        document.getElementById("vendedor-gerar");

    const result =
        document.getElementById("vendedor-result");


    if (
        !produtoInput ||
        !clienteInput ||
        !gerarButton ||
        !result
    ) {
        return;
    }


    /* =====================================================
       GERAR ABORDAGEM
       ===================================================== */

    gerarButton.addEventListener("click", () => {

        const produto =
            produtoInput.value.trim();

        const cliente =
            clienteInput.value.trim();


        if (!produto) {

            showResult(
                "Digite o que você está vendendo."
            );

            return;
        }


        if (!cliente) {

            showResult(
                "Digite o perfil do cliente."
            );

            return;
        }


        gerarButton.disabled = true;
        gerarButton.textContent = "Gerando...";


        setTimeout(() => {

            const abordagem =
                criarAbordagem(
                    produto,
                    cliente
                );

            showResult(abordagem);

            gerarButton.disabled = false;
            gerarButton.textContent =
                "Gerar abordagem";

        }, 500);

    });


    /* =====================================================
       CRIAR ABORDAGEM
       ===================================================== */

    function criarAbordagem(produto, cliente) {

        return `ABORDAGEM PROFISSIONAL

Olá, tudo bem?

Meu nome é João Pedro. Vi o trabalho de vocês e gostei bastante do que estão fazendo.

Entrei em contato porque trabalho com ${produto} e acredito que posso ajudar vocês a melhorar os resultados pela internet.

Como vocês trabalham como ${cliente}, acredito que existe uma oportunidade interessante para melhorar a forma como novos clientes chegam até vocês.

Posso te mostrar rapidamente como funcionaria?

Se fizer sentido para vocês, podemos marcar uma conversa ou uma ligação.

---

FOLLOW-UP

Olá! Tudo bem?

Passando só para saber se conseguiu ver minha mensagem anterior.

Acredito que a ideia pode ser interessante para vocês e posso explicar tudo de forma rápida, sem compromisso.

---

DICA DO VENDEDOR IA

Não tente vender tudo na primeira mensagem.

O objetivo inicial é conseguir uma resposta e abrir uma conversa.

Depois disso, descubra:

• Qual é o problema atual?
• Como conseguem clientes hoje?
• O que gostariam de melhorar?
• Quanto esse problema pode estar custando?

Só então apresente sua solução.`;

    }


    /* =====================================================
       MOSTRAR RESULTADO
       ===================================================== */

    function showResult(text) {

        result.classList.remove("hidden");

        result.textContent =
            text;

        result.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

});
