/* =========================================================
   HUNTER IA — HUNTER.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const messages =
        document.getElementById(
            "hunter-chat-messages"
        );

    const form =
        document.getElementById(
            "hunter-chat-form"
        );

    const input =
        document.getElementById(
            "hunter-chat-input"
        );

    const send =
        document.getElementById(
            "hunter-send-button"
        );


    if (!messages || !form || !input || !send) {
        return;
    }


    const logo =
        "assets/52C03B7F-4B7E-42D5-88BD-0737E812BE9D.jpeg";


    let nome =
        carregarNome();


    /* =====================================================
       ENVIO
       ===================================================== */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const texto =
                input.value.trim();


            if (!texto) return;


            adicionarMensagem(
                texto,
                "user"
            );


            input.value = "";

            ajustarInput();


            input.disabled = true;
            send.disabled = true;


            const typing =
                mostrarDigitando();


            await esperar(1800);


            removerDigitando(
                typing
            );


            const resposta =
                responder(texto);


            adicionarMensagem(
                resposta,
                "hunter"
            );


            input.disabled = false;
            send.disabled = false;

            input.focus();

        }
    );


    /* =====================================================
       SUGESTÕES
       ===================================================== */

    document
        .querySelectorAll(
            ".hunter-suggestion"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    input.value =
                        button.textContent.trim();

                    form.requestSubmit();

                }
            );

        });


    /* =====================================================
       ENTER
       ===================================================== */

    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                form.requestSubmit();

            }

        }
    );


    input.addEventListener(
        "input",
        ajustarInput
    );


    /* =====================================================
       NOME
       ===================================================== */

    function carregarNome() {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};


            return limparNome(
                user.name
            );

        } catch {

            return "";

        }

    }


    function limparNome(nome) {

        if (!nome) return "";

        return String(nome)
            .replace(
                /^olá[\s,]+/i,
                ""
            )
            .replace(
                /^ola[\s,]+/i,
                ""
            )
            .trim();

    }


    function salvarNome(novoNome) {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};


            user.name =
                novoNome;


            localStorage.setItem(
                "hunter_user",
                JSON.stringify(user)
            );


            nome =
                novoNome;

        } catch {}

    }


    /* =====================================================
       HORÁRIO
       ===================================================== */

    function saudacao() {

        const hora =
            new Date().getHours();


        if (hora >= 5 && hora < 12) {
            return "Bom dia";
        }


        if (hora >= 12 && hora < 18) {
            return "Boa tarde";
        }


        return "Boa noite";

    }


    function periodo() {

        const hora =
            new Date().getHours();


        if (hora >= 5 && hora < 12) {
            return "esta manhã";
        }


        if (hora >= 12 && hora < 18) {
            return "esta tarde";
        }


        return "esta noite";

    }


    /* =====================================================
       IDENTIFICAR NOME
       ===================================================== */

    function identificarNome(texto) {

        const padroes = [

            /meu nome é\s+([a-záàâãéêíóôõúç]+)/i,

            /meu nome e\s+([a-záàâãéêíóôõúç]+)/i,

            /me chamo\s+([a-záàâãéêíóôõúç]+)/i,

            /sou o\s+([a-záàâãéêíóôõúç]+)/i,

            /sou a\s+([a-záàâãéêíóôõúç]+)/i

        ];


        for (const padrao of padroes) {

            const resultado =
                texto.match(padrao);


            if (resultado?.[1]) {

                const nomeEncontrado =
                    resultado[1]
                        .trim()
                        .replace(
                            /[.,!?].*$/,
                            ""
                        );


                if (
                    nomeEncontrado.length >= 2 &&
                    nomeEncontrado.length <= 30
                ) {

                    return nomeEncontrado
                        .charAt(0)
                        .toUpperCase() +
                        nomeEncontrado
                            .slice(1)
                            .toLowerCase();

                }

            }

        }


        return "";

    }


    /* =====================================================
       RESPOSTA
       ===================================================== */

    function responder(textoOriginal) {

        const texto =
            textoOriginal
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                );


        /* Nome */

        const nomeEncontrado =
            identificarNome(
                textoOriginal
            );


        if (nomeEncontrado) {

            salvarNome(
                nomeEncontrado
            );


            return `${saudacao()}, ${nomeEncontrado}! 👋

Prazer em te conhecer.

O que você precisa ${periodo()}?`;

        }


        /* Saudação */

        if (
            texto === "oi" ||
            texto === "ola" ||
            texto.includes("oi hunter") ||
            texto.includes("ola hunter") ||
            texto.includes("bom dia") ||
            texto.includes("boa tarde") ||
            texto.includes("boa noite")
        ) {

            if (nome) {

                return `${saudacao()}, ${nome}! 👋

O que você precisa ${periodo()}?`;

            }


            return `${saudacao()}! 👋

Eu sou o Hunter IA.

O que você precisa ${periodo()}?`;

        }


        /* Primeira venda */

        if (
            texto.includes("primeira venda") ||
            texto.includes("primeiro cliente")
        ) {

            return `Se o objetivo é fazer sua primeira venda, eu começaria de forma simples.

Escolha um serviço que você consiga entregar bem, encontre empresas que realmente precisam dele e faça uma abordagem personalizada.

Primeiro consiga a conversa.

Depois descubra o problema do cliente e apresente a solução.

Se quiser, posso montar uma estratégia passo a passo para você.`;

        }


        /* Abordagem */

        if (
            texto.includes("abordagem") ||
            texto.includes("mensagem para cliente") ||
            texto.includes("o que falar")
        ) {

            return `Eu evitaria uma mensagem muito longa.

Uma boa abertura seria:

"Olá, tudo bem? Meu nome é João Pedro. Estive conhecendo um pouco o trabalho de vocês e gostei bastante do que fazem.

Percebi uma oportunidade que pode ajudar o negócio de vocês e queria te mostrar uma ideia rápida.

Podemos conversar por alguns minutos?"

Primeiro abra a conversa. Depois venda.`;

        }


        /* Landing Page */

        if (
            texto.includes("landing page") ||
            texto.includes("landingpage")
        ) {

            return `Uma Landing Page pode ser uma ótima oferta para começar.

Mas eu não venderia apenas "uma página".

Eu venderia o resultado:

"Uma página profissional criada para apresentar seu negócio e transformar visitantes em novos contatos."

Assim o cliente entende por que deveria comprar.`;

        }


        /* Preço */

        if (
            texto.includes("preco") ||
            texto.includes("quanto cobrar") ||
            texto.includes("quanto custa")
        ) {

            return `Para definir seu preço, considere:

• Complexidade
• Prazo
• Trabalho necessário
• Revisões
• Manutenção
• Valor gerado para o cliente

No começo, você pode trabalhar com uma oferta de entrada para conquistar os primeiros clientes e construir portfólio.`;

        }


        /* Caro */

        if (
            texto.includes("ta caro") ||
            texto.includes("esta caro") ||
            texto.includes("muito caro")
        ) {

            return `Não ofereça desconto imediatamente.

Pergunte:

"Entendo. O que exatamente fez você considerar o investimento alto?"

Isso ajuda a descobrir se o problema é realmente preço ou se o cliente ainda não percebeu o valor.`;

        }


        /* Não interessado */

        if (
            texto.includes("nao tenho interesse")
        ) {

            return `Não pressione.

Você pode responder:

"Tranquilo, sem problema! Só para eu entender: hoje vocês já possuem alguma solução para essa necessidade ou simplesmente não é uma prioridade?"

Assim você mantém a conversa profissional.`;

        }


        /* Não responde */

        if (
            texto.includes("nao responde") ||
            texto.includes("não responde")
        ) {

            return `Faça apenas um follow-up depois de algum tempo.

Por exemplo:

"Olá! Passando só para saber se conseguiu ver minha mensagem. Caso faça sentido para vocês, posso te explicar a ideia rapidamente."

Se não houver resposta, siga para o próximo prospect.`;

        }


        /* Estratégia */

        if (
            texto.includes("estrategia") ||
            texto.includes("como vender") ||
            texto.includes("conseguir clientes")
        ) {

            return `Eu faria assim:

1. Escolha uma oferta simples.
2. Encontre bons prospects.
3. Analise cada empresa.
4. Personalize sua abordagem.
5. Inicie a conversa.
6. Descubra o problema.
7. Apresente a solução.
8. Tente marcar uma ligação ou reunião.

O objetivo não é simplesmente mandar muitas mensagens.

É conversar com os prospects certos.`;

        }


        /* Oferta */

        if (
            texto.includes("oferta") ||
            texto.includes("vender meu servico")
        ) {

            return `Uma boa oferta precisa deixar três coisas claras:

1. O problema.
2. A solução.
3. O benefício.

Por exemplo:

"Eu crio Landing Pages profissionais para empresas que querem transformar visitantes em novos contatos pelo WhatsApp."

Isso é muito mais forte do que simplesmente dizer:

"Eu faço sites."`;

        }


        /* Ajuda */

        if (
            texto.includes("pode me ajudar") ||
            texto.includes("o que voce faz") ||
            texto.includes("o que você faz")
        ) {

            return `Posso te ajudar com vendas e negócios.

Por exemplo:

• Abordagem
• Prospecção
• Preço
• Ofertas
• Negociação
• Objeções
• Primeira venda
• Estratégias comerciais

Me conte o que está acontecendo e eu analiso com você.`;

        }


        /* Resposta geral */

        return `Entendi.

Quero analisar isso junto com você, em vez de simplesmente te mandar uma resposta pronta.

Me explica um pouco mais sobre a situação.

Pode falar normalmente, como se estivesse conversando comigo.`;

    }


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function adicionarMensagem(
        texto,
        tipo
    ) {

        const elemento =
            document.createElement(
                "div"
            );


        elemento.className =
            `hunter-message ${tipo}`;


        if (tipo === "hunter") {

            elemento.innerHTML = `

                <div class="hunter-message-avatar">

                    <img
                        src="${logo}"
                        alt="Hunter IA"
                    >

                </div>

                <div class="hunter-message-content">

                    ${formatar(texto)}

                </div>

            `;

        } else {

            elemento.innerHTML = `

                <div class="hunter-message-content">

                    ${formatar(texto)}

                </div>

            `;

        }


        messages.appendChild(
            elemento
        );


        messages.scrollTo({

            top:
                messages.scrollHeight,

            behavior:
                "smooth"

        });

    }


    /* =====================================================
       DIGITANDO
       ===================================================== */

    function mostrarDigitando() {

        const elemento =
            document.createElement(
                "div"
            );


        elemento.className =
            "hunter-message hunter";


        elemento.innerHTML = `

            <div class="hunter-message-avatar">

                <img
                    src="${logo}"
                    alt="Hunter IA"
                >

            </div>

            <div class="hunter-message-content hunter-typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        `;


        messages.appendChild(
            elemento
        );


        messages.scrollTop =
            messages.scrollHeight;


        return elemento;

    }


    function removerDigitando(elemento) {

        elemento?.remove();

    }


    /* =====================================================
       INPUT
       ===================================================== */

    function ajustarInput() {

        input.style.height =
            "auto";


        input.style.height =
            Math.min(
                input.scrollHeight,
                140
            ) + "px";

    }


    /* =====================================================
       SEGURANÇA
       ===================================================== */

    function formatar(texto) {

        return String(texto)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /\n/g,
                "<br>"
            );

    }


    function esperar(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );

    }

});
