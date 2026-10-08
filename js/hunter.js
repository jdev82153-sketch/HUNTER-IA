/* =========================================================
   HUNTER IA — HUNTER.JS
   Chat inteligente com resposta natural
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const chatMessages =
        document.getElementById("hunter-chat-messages");

    const chatForm =
        document.getElementById("hunter-chat-form");

    const chatInput =
        document.getElementById("hunter-chat-input");

    const sendButton =
        document.getElementById("hunter-send-button");


    if (
        !chatMessages ||
        !chatForm ||
        !chatInput ||
        !sendButton
    ) {
        return;
    }


    /* =====================================================
       LOGO DO HUNTER
       ===================================================== */

    const hunterLogo =
        "assets/52C03B7F-4B7E-42D5-88BD-0737E812BE9D.jpeg";


    /* =====================================================
       ENVIO DA MENSAGEM
       ===================================================== */

    chatForm.addEventListener("submit", event => {

        event.preventDefault();

        const mensagem =
            chatInput.value.trim();


        if (!mensagem) return;


        adicionarMensagem(
            mensagem,
            "user"
        );


        chatInput.value = "";

        ajustarTextarea();


        /* Desativa enquanto o Hunter responde */

        chatInput.disabled = true;
        sendButton.disabled = true;


        const typing =
            mostrarDigitando();


        /*
         * Pequeno atraso para deixar a conversa
         * mais natural.
         */

        setTimeout(() => {

            removerDigitando(typing);


            const resposta =
                gerarResposta(mensagem);


            adicionarMensagem(
                resposta,
                "hunter"
            );


            chatInput.disabled = false;
            sendButton.disabled = false;

            chatInput.focus();


        }, 2000);

    });


    /* =====================================================
       SUGESTÕES
       ===================================================== */

    document.querySelectorAll(".hunter-suggestion")
        .forEach(button => {

            button.addEventListener("click", () => {

                const texto =
                    button.textContent.trim();


                if (!texto) return;


                chatInput.value =
                    texto;


                chatForm.requestSubmit();

            });

        });


    /* =====================================================
       ENTER
       ===================================================== */

    chatInput.addEventListener("keydown", event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.requestSubmit();

        }

    });


    /* =====================================================
       ALTURA AUTOMÁTICA
       ===================================================== */

    chatInput.addEventListener(
        "input",
        ajustarTextarea
    );


    function ajustarTextarea() {

        chatInput.style.height =
            "auto";

        chatInput.style.height =
            Math.min(
                chatInput.scrollHeight,
                150
            ) + "px";

    }


    /* =====================================================
       ADICIONAR MENSAGEM
       ===================================================== */

    function adicionarMensagem(
        texto,
        tipo
    ) {

        const mensagem =
            document.createElement("div");


        mensagem.className =
            `hunter-message ${tipo}`;


        if (tipo === "hunter") {

            mensagem.innerHTML = `
                <div class="hunter-message-avatar">
                    <img
                        src="${hunterLogo}"
                        alt="Hunter IA"
                    >
                </div>

                <div class="hunter-message-content">
                    ${formatarTexto(texto)}
                </div>
            `;

        } else {

            mensagem.innerHTML = `
                <div class="hunter-message-content">
                    ${formatarTexto(texto)}
                </div>
            `;

        }


        chatMessages.appendChild(
            mensagem
        );


        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: "smooth"
        });

    }


    /* =====================================================
       INDICADOR DE DIGITAÇÃO
       ===================================================== */

    function mostrarDigitando() {

        const elemento =
            document.createElement("div");


        elemento.className =
            "hunter-message hunter typing-message";


        elemento.innerHTML = `
            <div class="hunter-message-avatar">
                <img
                    src="${hunterLogo}"
                    alt="Hunter IA"
                >
            </div>

            <div class="hunter-message-content hunter-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;


        chatMessages.appendChild(
            elemento
        );


        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: "smooth"
        });


        return elemento;

    }


    /* =====================================================
       REMOVER DIGITAÇÃO
       ===================================================== */

    function removerDigitando(elemento) {

        if (elemento && elemento.parentNode) {

            elemento.parentNode.removeChild(
                elemento
            );

        }

    }


    /* =====================================================
       RESPOSTAS DO HUNTER
       ===================================================== */

    function gerarResposta(mensagem) {

        const texto =
            mensagem.toLowerCase();


        if (
            texto.includes("primeira venda") ||
            texto.includes("primeiro cliente")
        ) {

            return `Se o objetivo é fazer sua primeira venda, eu focaria em uma oferta simples e fácil de entregar.

Por exemplo:

• Landing Page
• Site institucional simples
• Página de vendas
• Otimização de presença digital

Escolha um serviço, encontre empresas que realmente precisam dele e faça uma abordagem personalizada.

O mais importante agora não é criar a oferta perfeita.

É conseguir conversar com potenciais clientes e apresentar uma solução real.`;

        }


        if (
            texto.includes("abordagem") ||
            texto.includes("mensagem para cliente")
        ) {

            return `Eu faria uma abordagem curta e personalizada.

Exemplo:

"Olá, tudo bem? Meu nome é João Pedro. Estive conhecendo um pouco o trabalho de vocês e gostei bastante do que fazem.

Percebi uma oportunidade que pode ajudar o negócio de vocês a conseguir ainda mais clientes.

Eu trabalho com soluções digitais e queria te mostrar uma ideia rápida. Podemos conversar por alguns minutos?"

O segredo é não tentar vender tudo na primeira mensagem. Primeiro consiga a conversa.`;

        }


        if (
            texto.includes("caro") ||
            texto.includes("está caro") ||
            texto.includes("ta caro")
        ) {

            return `Se o cliente disser que está caro, não tente dar desconto imediatamente.

Você pode responder:

"Entendo. Para eu conseguir te orientar melhor, o que exatamente fez você considerar o investimento alto?"

Assim você descobre se o problema realmente é preço ou se o cliente ainda não percebeu o valor da solução.

Depois disso, mostre o resultado que seu serviço pode gerar.`;

        }


        if (
            texto.includes("não tenho interesse") ||
            texto.includes("nao tenho interesse")
        ) {

            return `Não pressione.

Você pode responder:

"Tranquilo, sem problema! Só para eu entender melhor, hoje vocês já possuem alguma solução para essa necessidade ou simplesmente não é uma prioridade no momento?"

Essa pergunta pode revelar uma oportunidade sem parecer insistente.`;

        }


        if (
            texto.includes("não responde") ||
            texto.includes("nao responde")
        ) {

            return `Se o cliente não respondeu, não mande várias mensagens seguidas.

Faça um follow-up simples depois de algum tempo:

"Olá! Passando só para saber se conseguiu ver minha mensagem. Caso faça sentido para vocês, posso te explicar a ideia rapidamente."

Se mesmo assim não houver resposta, siga para o próximo prospect.`;

        }


        if (
            texto.includes("landing page") ||
            texto.includes("landingpage")
        ) {

            return `Uma Landing Page pode ser uma ótima oferta para começar porque é mais simples de explicar e entregar do que um projeto grande.

Você pode vender a ideia assim:

"Uma página criada especificamente para transformar visitantes em contatos e oportunidades para o seu negócio."

Não venda apenas "uma página".

Venda o objetivo dela: gerar mais contatos e oportunidades.`;

        }


        if (
            texto.includes("preço") ||
            texto.includes("quanto cobrar") ||
            texto.includes("quanto custa")
        ) {

            return `Não defina seu preço olhando apenas para o tempo que você vai gastar.

Considere:

• Complexidade
• Prazo
• Número de páginas
• Revisões
• Manutenção
• Valor para o cliente
• Resultado esperado

Uma Landing Page simples, por exemplo, pode ter um preço inicial acessível enquanto você conquista seus primeiros clientes e aumenta seu portfólio.`;

        }


        if (
            texto.includes("estratégia") ||
            texto.includes("estrategia")
        ) {

            return `Eu faria assim:

1. Escolha um serviço simples.
2. Encontre empresas que realmente precisam dele.
3. Analise rapidamente cada negócio.
4. Personalize sua abordagem.
5. Inicie uma conversa.
6. Descubra o problema.
7. Apresente sua solução.
8. Tente marcar uma ligação ou reunião.

O objetivo não é mandar 100 mensagens genéricas.

É encontrar bons prospects e conversar com eles de forma inteligente.`;

        }


        if (
            texto.includes("oferta") ||
            texto.includes("vender")
        ) {

            return `Uma boa oferta precisa responder três coisas:

1. Qual problema você resolve?
2. Como você resolve?
3. Qual benefício o cliente recebe?

Por exemplo:

"Eu crio Landing Pages profissionais para empresas que querem transformar visitantes em novos contatos pelo WhatsApp."

Isso é muito mais forte do que simplesmente dizer:

"Eu faço sites."`;

        }


        if (
            texto.includes("oi") ||
            texto.includes("olá") ||
            texto.includes("ola") ||
            texto.includes("bom dia") ||
            texto.includes("boa tarde") ||
            texto.includes("boa noite")
        ) {

            return `Olá! 👋

Estou pronto para te ajudar.

Pode me falar o que você precisa: estratégia de vendas, abordagem de clientes, preço, oferta, negociação ou qualquer outra coisa relacionada ao seu negócio.`;

        }


        return `Entendi.

Vamos pensar nisso de forma estratégica.

Me conte um pouco mais sobre a situação ou sobre o que você está tentando conseguir.

Quanto mais contexto você me passar, melhor eu consigo te orientar.

Estou aqui para pensar junto com você.`;

    }


    /* =====================================================
       FORMATAR TEXTO
       ===================================================== */

    function formatarTexto(texto) {

        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");

    }

});
