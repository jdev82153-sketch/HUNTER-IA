/* =====================================================
   HUNTER IA
   Chat principal do Hunter IA
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("hunter-chat-form");
    const input = document.getElementById("hunter-chat-input");
    const messages = document.getElementById("hunter-chat-messages");
    const sendButton = document.getElementById("hunter-send-button");
    const suggestions = document.querySelectorAll(".hunter-suggestion");

    if (!form || !input || !messages) return;

    // =====================================================
    // ADICIONAR MENSAGEM
    // =====================================================

    function addMessage(text, type = "ai") {
        const message = document.createElement("div");

        message.className = `hunter-message ${type}`;

        if (type === "user") {
            message.innerHTML = `
                <div class="hunter-message-content">
                    ${escapeHTML(text).replace(/\n/g, "<br>")}
                </div>
            `;
        } else {
            message.innerHTML = `
                <div class="hunter-avatar">H</div>
                <div class="hunter-message-content">
                    ${text}
                </div>
            `;
        }

        messages.appendChild(message);
        scrollToBottom();
    }

    // =====================================================
    // INDICADOR DE DIGITAÇÃO
    // =====================================================

    function showTyping() {
        const typing = document.createElement("div");

        typing.className = "hunter-message ai hunter-typing-message";
        typing.id = "hunter-typing";

        typing.innerHTML = `
            <div class="hunter-avatar">H</div>
            <div class="hunter-message-content hunter-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        messages.appendChild(typing);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = document.getElementById("hunter-typing");

        if (typing) {
            typing.remove();
        }
    }

    // =====================================================
    // RESPOSTAS DO HUNTER
    // =====================================================

    function getResponse(question) {
        const text = question.toLowerCase().trim();

        if (
            text.includes("primeira venda") ||
            text.includes("conseguir cliente") ||
            text.includes("conseguir clientes")
        ) {
            return `
                <strong>Vamos buscar sua primeira venda. 🚀</strong><br><br>

                1. Escolha um serviço simples para vender.<br>
                2. Procure empresas que realmente precisam dele.<br>
                3. Entre em contato de forma personalizada.<br>
                4. Mostre o problema que você consegue resolver.<br>
                5. Faça uma oferta simples e direta.<br><br>

                Se você quiser, eu também posso montar <strong>uma abordagem pronta</strong> para você enviar agora.
            `;
        }

        if (
            text.includes("abordagem") ||
            text.includes("mensagem para cliente") ||
            text.includes("mensagem")
        ) {
            return `
                Claro. 💬<br><br>

                Você pode começar assim:<br><br>

                <em>“Olá, tudo bem? Meu nome é João Pedro. Vi o trabalho de vocês e gostei bastante do que estão fazendo. Estou trabalhando com soluções digitais para ajudar empresas a melhorar sua presença online e conseguir mais oportunidades. Posso te mostrar uma ideia rápida que preparei para vocês?”</em><br><br>

                O objetivo é iniciar uma conversa sem parecer uma mensagem automática de venda.
            `;
        }

        if (
            text.includes("estratégia") ||
            text.includes("vendas") ||
            text.includes("vender")
        ) {
            return `
                <strong>Estratégia simples de vendas:</strong> 🎯<br><br>

                <strong>1.</strong> Encontre empresas com um problema claro.<br>
                <strong>2.</strong> Faça uma abordagem personalizada.<br>
                <strong>3.</strong> Mostre uma solução específica.<br>
                <strong>4.</strong> Ofereça um próximo passo fácil, como uma conversa rápida.<br>
                <strong>5.</strong> Faça follow-up caso não respondam.<br><br>

                O segredo é não tentar vender para todo mundo. Encontre quem realmente tem potencial.
            `;
        }

        if (
            text.includes("ideia de negócio") ||
            text.includes("ideia de negocio") ||
            text.includes("negócio")
        ) {
            return `
                Uma ideia interessante para começar com pouco investimento é vender <strong>serviços digitais para pequenos negócios</strong>. 💡<br><br>

                Você pode oferecer criação de landing pages, páginas comerciais, melhorias de presença online ou materiais de divulgação.<br><br>

                Comece com uma oferta simples, consiga os primeiros clientes e depois aumente o valor do serviço.
            `;
        }

        if (
            text.includes("preço") ||
            text.includes("quanto cobrar") ||
            text.includes("valor")
        ) {
            return `
                O preço depende principalmente do serviço e do valor que ele entrega. 💰<br><br>

                Para uma primeira venda, você pode começar com uma oferta de entrada mais acessível, entregar um trabalho muito bom e usar esse projeto para criar portfólio.<br><br>

                Depois dos primeiros resultados, aumente gradualmente seu preço.
            `;
        }

        if (
            text.includes("landing page") ||
            text.includes("landingpage")
        ) {
            return `
                Uma <strong>landing page</strong> é uma página criada com um objetivo específico, normalmente gerar contatos, vendas ou pedidos de orçamento. 📈<br><br>

                Ela costuma ser mais simples e rápida de produzir do que um site completo, por isso pode ser uma ótima oferta para começar a vender serviços digitais.
            `;
        }

        if (
            text.includes("oi") ||
            text.includes("olá") ||
            text.includes("ola") ||
            text.includes("bom dia") ||
            text.includes("boa tarde") ||
            text.includes("boa noite")
        ) {
            return `
                Olá! 👋<br><br>

                Eu sou o <strong>Hunter IA</strong>, seu assistente para vendas e negócios.<br><br>

                Pode me perguntar sobre vendas, abordagens, estratégias, ofertas, negócios ou qualquer outra coisa que você queira analisar.
            `;
        }

        return `
            Entendi. 👀<br><br>

            Posso te ajudar a analisar essa situação e pensar em uma estratégia prática.<br><br>

            Me conte um pouco mais sobre o que você está tentando fazer, qual é o seu objetivo e qual dificuldade está enfrentando.
        `;
    }

    // =====================================================
    // ENVIAR MENSAGEM
    // =====================================================

    async function sendMessage(text) {
        text = text.trim();

        if (!text) return;

        input.value = "";
        input.style.height = "auto";

        addMessage(text, "user");

        if (sendButton) {
            sendButton.disabled = true;
        }

        showTyping();

        await new Promise(resolve => {
            setTimeout(resolve, 900);
        });

        removeTyping();

        const response = getResponse(text);

        addMessage(response, "ai");

        if (sendButton) {
            sendButton.disabled = false;
        }

        input.focus();
    }

    // =====================================================
    // FORMULÁRIO
    // =====================================================

    form.addEventListener("submit", event => {
        event.preventDefault();

        sendMessage(input.value);
    });

    // =====================================================
    // SUGESTÕES
    // =====================================================

    suggestions.forEach(button => {
        button.addEventListener("click", () => {
            const text =
                button.dataset.prompt ||
                button.textContent.trim();

            sendMessage(text);
        });
    });

    // =====================================================
    // ENTER / SHIFT + ENTER
    // =====================================================

    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            sendMessage(input.value);
        }
    });

    // =====================================================
    // ALTURA AUTOMÁTICA DO TEXTAREA
    // =====================================================

    input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
    });

    // =====================================================
    // SCROLL
    // =====================================================

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    // =====================================================
    // SEGURANÇA
    // =====================================================

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});
