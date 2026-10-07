/* =========================================================
   HUNTER IA — LEADS.JS
   Buscador de Leads
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("leads-search-form");
    const cityInput = document.getElementById("lead-city");
    const nicheInput = document.getElementById("lead-niche");
    const countryInput = document.getElementById("lead-country");

    const button = document.getElementById("search-leads-button");
    const message = document.getElementById("leads-search-message");
    const results = document.getElementById("leads-results");


    if (!form) {
        return;
    }


    /* =====================================================
       BUSCA
       ===================================================== */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const country = countryInput
            ? countryInput.value.trim()
            : "";

        const city = cityInput
            ? cityInput.value.trim()
            : "";

        const niche = nicheInput
            ? nicheInput.value.trim()
            : "";


        /* Validação */

        if (!city) {

            showMessage(
                "Digite uma cidade para começar a busca.",
                "error"
            );

            if (cityInput) {
                cityInput.focus();
            }

            return;
        }


        if (!niche) {

            showMessage(
                "Digite o nicho que você deseja encontrar.",
                "error"
            );

            if (nicheInput) {
                nicheInput.focus();
            }

            return;
        }


        /* Estado de carregamento */

        if (button) {

            button.disabled = true;

            button.textContent =
                "🔎 Procurando leads...";

        }


        showMessage(
            "Preparando sua busca...",
            "loading"
        );


        if (results) {
            results.innerHTML = "";
        }


        /*
         * Por enquanto não fazemos a chamada
         * da API diretamente pelo navegador.
         *
         * A próxima etapa será:
         *
         * Hunter IA
         *      ↓
         * Backend
         *      ↓
         * Google Places
         *
         * Isso evita expor a chave da API.
         */

        setTimeout(function () {

            if (button) {

                button.disabled = false;

                button.textContent =
                    "🔎 Buscar Leads";

            }


            showMessage(
                "Buscador preparado. A conexão com o Google Places será adicionada na próxima etapa.",
                "success"
            );


            if (results) {

                results.innerHTML = createPreparationCard(
                    country,
                    city,
                    niche
                );

            }

        }, 900);

    });


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function showMessage(text, type) {

        if (!message) {
            return;
        }


        message.textContent = text;


        message.style.display = "block";


        if (type === "error") {

            message.style.color = "#ff6b6b";

        } else if (type === "success") {

            message.style.color = "#2ecc71";

        } else {

            message.style.color = "#8ea8c4";

        }

    }


    /* =====================================================
       CARD TEMPORÁRIO
       ===================================================== */

    function createPreparationCard(
        country,
        city,
        niche
    ) {

        const countryName =
            country === "US"
                ? "🇺🇸 Estados Unidos"
                : "🇧🇷 Brasil";


        return `
            <div class="tool-panel">

                <div class="tool-panel-header">

                    <h2>
                        Busca preparada
                    </h2>

                    <p>
                        O Hunter IA está pronto para procurar
                        empresas reais nessa região.
                    </p>

                </div>


                <div
                    style="
                        display:grid;
                        gap:10px;
                        margin-top:15px;
                    "
                >

                    <div>
                        <strong>🌎 País:</strong>
                        ${escapeHTML(countryName)}
                    </div>

                    <div>
                        <strong>📍 Cidade:</strong>
                        ${escapeHTML(city)}
                    </div>

                    <div>
                        <strong>🎯 Nicho:</strong>
                        ${escapeHTML(niche)}
                    </div>

                </div>


                <div
                    style="
                        margin-top:20px;
                        padding:15px;
                        border-radius:12px;
                        background:rgba(47,128,237,0.08);
                        border:1px solid rgba(47,128,237,0.20);
                    "
                >

                    <strong>
                        🔐 Próxima etapa
                    </strong>

                    <p
                        style="
                            color:#9aa6b2;
                            font-size:13px;
                            line-height:1.6;
                            margin-bottom:0;
                        "
                    >
                        Vamos conectar esta busca ao backend
                        do Hunter IA e ao Google Places.
                        A chave da API não ficará exposta
                        no código público.
                    </p>

                </div>

            </div>
        `;

    }


    /* =====================================================
       SEGURANÇA — ESCAPAR TEXTO
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
