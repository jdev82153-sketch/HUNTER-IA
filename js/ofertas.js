/* =========================================================
   HUNTER IA — OFERTAS.JS
   Gerador de ofertas profissionais
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const servico =
        document.getElementById("oferta-servico");

    const problema =
        document.getElementById("oferta-problema");

    const beneficio =
        document.getElementById("oferta-beneficio");

    const botao =
        document.getElementById("oferta-gerar");

    const resultado =
        document.getElementById("oferta-result");


    if (
        !servico ||
        !problema ||
        !beneficio ||
        !botao ||
        !resultado
    ) {
        return;
    }


    /* =====================================================
       GERAR OFERTA
       ===================================================== */

    botao.addEventListener("click", () => {

        const nomeServico =
            servico.value.trim();

        const problemaCliente =
            problema.value.trim();

        const beneficioCliente =
            beneficio.value.trim();


        if (!nomeServico) {

            mostrarResultado(
                "Digite o serviço ou produto que você deseja oferecer."
            );

            servico.focus();

            return;
        }


        if (!problemaCliente) {

            mostrarResultado(
                "Digite o principal problema ou necessidade do cliente."
            );

            problema.focus();

            return;
        }


        if (!beneficioCliente) {

            mostrarResultado(
                "Digite o principal benefício que sua solução oferece."
            );

            beneficio.focus();

            return;
        }


        const oferta =
`OFERTA GERADA PELO HUNTER IA

🚀 ${nomeServico}

Seu negócio pode estar perdendo oportunidades por causa de:

"${problemaCliente}"

A solução:

Com ${nomeServico}, você pode solucionar esse problema de forma mais profissional e estratégica.

Principal benefício:

${beneficioCliente}

━━━━━━━━━━━━━━━━━━━━

💬 MENSAGEM PARA ENVIAR AO CLIENTE

Olá! Tudo bem?

Estive conhecendo um pouco melhor o seu negócio e percebi uma oportunidade que pode ajudar vocês.

Notei que ${problemaCliente.toLowerCase()}.

Eu trabalho com ${nomeServico} e acredito que podemos melhorar esse ponto e gerar um resultado mais interessante para o negócio.

O principal objetivo seria ${beneficioCliente.toLowerCase()}.

Se fizer sentido para você, podemos conversar rapidamente e eu te explico como funcionaria.

Podemos marcar uma ligação ou uma reunião rápida?

━━━━━━━━━━━━━━━━━━━━

🎯 DICA DO HUNTER IA

Não tente vender tudo na primeira mensagem.

Primeiro desperte interesse.

Depois entenda o problema do cliente.

Por último, apresente sua solução e o investimento.

Venda a transformação, não apenas o serviço.`;

        mostrarResultado(oferta);

    });


    /* =====================================================
       ENTER / CTRL + ENTER
       ===================================================== */

    [servico, problema, beneficio].forEach(input => {

        input.addEventListener("keydown", event => {

            if (
                event.key === "Enter" &&
                (event.ctrlKey || event.metaKey)
            ) {

                event.preventDefault();

                botao.click();

            }

        });

    });


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
