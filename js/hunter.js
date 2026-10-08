/* =========================================================
   HUNTER IA — HUNTER.JS
   Chat principal do Hunter IA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const chatForm =
        document.getElementById("hunter-chat-form");

    const input =
        document.getElementById("hunter-chat-input");

    const messages =
        document.getElementById("hunter-chat-messages");

    const sendButton =
        document.getElementById("hunter-send-button");

    const suggestions =
        document.querySelectorAll(".hunter-suggestion");


    if (!chatForm || !input || !messages) return;


    /* =====================================================
       CONFIGURAÇÃO
       ===================================================== */

    const HUNTER_LOGO =
        "assets/52C03B7F-4B7E-42D5-88BD-0737E812BE9D.jpeg";


    /* =====================================================
       ENVIA MENSAGEM
       ===================================================== */

    chatForm.addEventListener("submit", event => {

        event.preventDefault();

        sendMessage();

    });


    /* =====================================================
       BOTÕES DE SUGESTÃO
       ===================================================== */

    suggestions.forEach(button => {

        button.addEventListener("click", () => {

            const prompt =
                button.dataset.prompt || "";

            if (!prompt) return;

            input.value = prompt;

            sendMessage();

        });

    });


    /* =====================================================
       ENTER PARA ENVIAR
       ===================================================== */

    input.addEventListener("keydown", event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    });


    /* =====================================================
       AJUSTA ALTURA DO TEXTAREA
       ===================================================== */

    input.addEventListener("input", () => {

        input.style.height = "auto";

        input.style.height =
            Math.min(input.scrollHeight, 120) + "px";

    });


    /* =====================================================
       FUNÇÃO PRINCIPAL
       ===================================================== */

    function sendMessage() {

        const text =
            input.value.trim();

        if (!text) return;


        addUserMessage(text);

        input.value = "";
        input.style.height = "auto";

        setLoading(true);


        setTimeout(() => {

            const response =
                generateHunterResponse(text);

            addHunterMessage(response);

            setLoading(false);

        }, 700);

    }


    /* =====================================================
       MENSAGEM DO USUÁRIO
       ===================================================== */

    function addUserMessage(text) {

        const message =
            document.createElement("div");

        message.className =
            "hunter-message user";


        const avatar =
            document.createElement("div");

        avatar.className =
            "hunter-avatar";

        avatar.textContent =
            getUserInitial();


        const content =
            document.createElement("div");

        content.className =
            "hunter-message-content";

        content.textContent =
            text;


        message.appendChild(avatar);
        message.appendChild(content);

        messages.appendChild(message);

        scrollChat();

    }


    /* =====================================================
       MENSAGEM DO HUNTER
       ===================================================== */

    function addHunterMessage(text) {

        const message =
            document.createElement("div");

        message.className =
            "hunter-message ai";


        const avatar =
            document.createElement("div");

        avatar.className =
            "hunter-avatar";


        const image =
            document.createElement("img");

        image.src =
            HUNTER_LOGO;

        image.alt =
            "Hunter IA";


        avatar.appendChild(image);


        const content =
            document.createElement("div");

        content.className =
            "hunter-message-content";


        /* Permite algumas quebras de linha */

        content.innerHTML =
            formatResponse(text);


        message.appendChild(avatar);
        message.appendChild(content);

        messages.appendChild(message);

        scrollChat();

    }


    /* =====================================================
       FORMATA RESPOSTA
       ===================================================== */

    function formatResponse(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");
    }


    /* =====================================================
       RESPOSTAS DO HUNTER
       ===================================================== */

    function generateHunterResponse(text) {

        const message =
            text.toLowerCase();


        /* Primeira venda */

        if (
            message.includes("primeira venda") ||
            message.includes("primeiro cliente") ||
            message.includes("começar a vender")
        ) {

            return `Se o objetivo é conseguir sua primeira venda rapidamente, eu faria assim:

1. Escolha um serviço simples de entregar.
2. Procure empresas que realmente tenham um problema.
3. Faça uma abordagem curta e personalizada.
4. Mostre o problema que você encontrou.
5. Ofereça uma solução objetiva.
6. Tente levar a conversa para uma ligação ou reunião.

Para começar, uma landing page é uma ótima oferta porque é simples de explicar e pode ser entregue rapidamente.

Se quiser, posso montar agora uma abordagem para você mandar para um cliente.`;

        }


        /* Abordagem */

        if (
            message.includes("abordagem") ||
            message.includes("mensagem para cliente") ||
            message.includes("mensagem profissional")
        ) {

            return `Claro. Uma abordagem simples e profissional seria:

"Olá, tudo bem? Meu nome é João Pedro. Vi o trabalho de vocês e gostei bastante do que estão fazendo. Percebi uma oportunidade que pode ajudar vocês a conseguir ainda mais clientes pela internet. Trabalho com criação de páginas profissionais e gostaria de mostrar uma ideia rápida para vocês. Podemos marcar uma conversa ou uma ligação?"`;

        }


        /* Estratégia */

        if (
            message.includes("estratégia") ||
            message.includes("estrategia") ||
            message.includes("vender mais")
        ) {

            return `Eu focaria em três coisas:

• Prospecção diária
• Abordagem personalizada
• Follow-up

Uma meta simples para começar:

10 novos contatos por dia → 5 conversas → 2 oportunidades → 1 venda.

O segredo é não tentar vender para todo mundo. Encontre empresas que realmente tenham um problema que seu serviço resolve.`;

        }


        /* Oferta */

        if (
            message.includes("oferta") ||
            message.includes("proposta")
        ) {

            return `Uma boa oferta precisa deixar três coisas muito claras:

O que você entrega.
Qual problema você resolve.
Por que vale a pena comprar agora.

Exemplo:

"Landing Page Profissional para transformar visitantes em clientes.

✓ Página personalizada
✓ Design profissional
✓ Botão de WhatsApp
✓ Estrutura focada em conversão

Ideal para empresas que querem receber mais contatos pela internet."

Se quiser, posso montar uma oferta completa baseada no seu serviço.`;

        }


        /* Preço */

        if (
            message.includes("preço") ||
            message.includes("preco") ||
            message.includes("quanto cobrar") ||
            message.includes("valor")
        ) {

            return `Para definir seu preço, primeiro precisamos entender:

• O que você vai entregar
• Quanto tempo vai gastar
• Seu custo
• O valor percebido pelo cliente
• O nível de dificuldade

Se você está buscando sua primeira venda, pode começar com uma oferta de entrada mais acessível, conseguir o primeiro cliente e depois aumentar seu preço conforme cria portfólio e resultados.`;

        }


        /* Landing page */

        if (
            message.includes("landing page") ||
            message.includes("landingpage")
        ) {

            return `Uma landing page é uma página única criada com um objetivo específico, normalmente gerar contatos, pedidos de orçamento ou vendas.

Para prospectar empresas, ela pode ser uma ótima oferta porque é mais rápida de produzir do que um site completo e é fácil de demonstrar ao cliente.

Se você quiser, posso te ajudar a montar uma oferta de landing page por um preço de entrada.`;

        }


        /* Cliente não responde */

        if (
            message.includes("não responde") ||
            message.includes("nao responde") ||
            message.includes("sumiu")
        ) {

            return `Não desista depois da primeira mensagem.

Faça um follow-up curto e sem pressionar:

"Olá! Passando só para saber se conseguiu ver minha mensagem anterior. Identifiquei uma oportunidade que pode ser interessante para vocês. Se quiser, posso te explicar rapidamente como funcionaria."

Se ainda não responder, siga para o próximo prospecto e tente novamente depois.`;

        }


        /* Cliente achou caro */

        if (
            message.includes("caro") ||
            message.includes("muito caro") ||
            message.includes("sem dinheiro")
        ) {

            return `Não tente simplesmente dar desconto.

Primeiro descubra o motivo:

"Entendo. O que ficou mais pesado para vocês: o investimento ou o momento atual?"

Assim você descobre se o problema realmente é preço.

Se for necessário, você pode criar uma versão mais simples da solução com um valor de entrada menor.`;

        }


        /* Cliente diz não */

        if (
            message.includes("não quero") ||
            message.includes("nao quero") ||
            message.includes("não tenho interesse") ||
            message.includes("nao tenho interesse")
        ) {

            return `Você pode responder:

"Tranquilo, sem problema! Só por curiosidade, hoje vocês já têm alguma estratégia para conseguir novos clientes pela internet?"

Isso transforma um "não" em uma oportunidade para entender melhor o cliente.

Mas lembre: não pressione. Se a pessoa realmente não tiver interesse, agradeça e siga para o próximo contato.`;

        }


        /* Saudação */

        if (
            message === "oi" ||
            message === "olá" ||
            message === "ola" ||
            message.includes("bom dia") ||
            message.includes("boa tarde") ||
            message.includes("boa noite")
        ) {

            return `Olá! 👋

Sou o Hunter IA, seu assistente para vendas e negócios.

Posso ajudar você com:

• Prospecção
• Abordagens
• Follow-ups
• Objeções
• Ofertas
• Preços
• Estratégias de vendas

Me diga o que você precisa e vamos trabalhar nisso. 🚀`;

        }


        /* Resposta padrão */

        return `Entendi. 👊

Posso te ajudar a transformar isso em uma estratégia prática de vendas.

Tente me perguntar algo como:

• "Como consigo minha primeira venda?"
• "Crie uma abordagem para uma clínica."
• "O cliente disse que está caro. O que respondo?"
• "Me ajude a criar uma oferta."
• "Quanto devo cobrar por uma landing page?"

Quanto mais contexto você me passar, melhor consigo estruturar a estratégia.`;

    }


    /* =====================================================
       LOADING
       ===================================================== */

    function setLoading(loading) {

        if (!sendButton) return;

        sendButton.disabled =
            loading;

        if (loading) {

            sendButton.textContent =
                "…";

            sendButton.style.opacity =
                "0.6";

        } else {

            sendButton.textContent =
                "➤";

            sendButton.style.opacity =
                "1";

        }

    }


    /* =====================================================
       SCROLL
       ===================================================== */

    function scrollChat() {

        requestAnimationFrame(() => {

            messages.scrollTop =
                messages.scrollHeight;

        });

    }


    /* =====================================================
       INICIAL
       ===================================================== */

    function getUserInitial() {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};

            return (
                user.name
                    ?.trim()
                    .charAt(0)
                    .toUpperCase()
                || "V"
            );

        } catch {

            return "V";

        }

    }

});
