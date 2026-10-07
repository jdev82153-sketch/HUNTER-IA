/* =========================================================
   HUNTER IA — CONFIGURAÇÕES.JS
   Configuração da API
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("api-settings-form");

    const apiInput =
        document.getElementById("google-api-key");

    const toggleButton =
        document.getElementById("toggle-api-key");

    const testButton =
        document.getElementById("test-api-key");

    const saveButton =
        document.getElementById("save-api-key");

    const status =
        document.getElementById("api-status");

    const connected =
        document.getElementById("api-connected");


    if (!form || !apiInput) {
        return;
    }


    /* =====================================================
       CARREGAR CONFIGURAÇÃO SALVA
       ===================================================== */

    const savedKey =
        localStorage.getItem("hunter_google_api_key");


    if (savedKey) {

        apiInput.value = savedKey;

        showStatus(
            "Chave cadastrada. Teste a conexão para confirmar.",
            "info"
        );

    }


    /* =====================================================
       MOSTRAR / ESCONDER CHAVE
       ===================================================== */

    if (toggleButton) {

        toggleButton.addEventListener(
            "click",
            function () {

                if (apiInput.type === "password") {

                    apiInput.type = "text";

                    toggleButton.textContent = "🙈";

                } else {

                    apiInput.type = "password";

                    toggleButton.textContent = "👁";

                }

            }
        );

    }


    /* =====================================================
       TESTAR API
       ===================================================== */

    if (testButton) {

        testButton.addEventListener(
            "click",
            async function () {

                const key =
                    apiInput.value.trim();


                if (!key) {

                    showStatus(
                        "Digite uma chave API primeiro.",
                        "error"
                    );

                    apiInput.focus();

                    return;
                }


                testButton.disabled = true;

                testButton.textContent =
                    "🔄 Testando...";


                hideConnected();


                /*
                 * IMPORTANTE:
                 *
                 * Ainda não fazemos uma chamada
                 * real ao Google diretamente daqui.
                 *
                 * A validação real será feita pelo
                 * backend na próxima etapa.
                 */

                await wait(900);


                /*
                 * Validação básica apenas para
                 * preparar a interface.
                 */

                if (key.length < 10) {

                    showStatus(
                        "A chave parece inválida. Verifique o valor informado.",
                        "error"
                    );

                } else {

                    showStatus(
                        "Chave cadastrada. A validação real com o Google Places será feita pelo backend.",
                        "info"
                    );


                    if (connected) {

                        connected.style.display =
                            "block";

                    }


                    if (saveButton) {

                        saveButton.style.display =
                            "block";

                    }

                }


                testButton.disabled = false;

                testButton.textContent =
                    "🔐 Testar chave API";

            }
        );

    }


    /* =====================================================
       SALVAR
       ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const key =
                apiInput.value.trim();


            if (!key) {

                showStatus(
                    "Digite uma chave API antes de salvar.",
                    "error"
                );

                return;
            }


            /*
             * Temporariamente guardamos a configuração
             * localmente para a interface.
             *
             * Na versão final, a chave deverá ficar
             * protegida no backend.
             */

            localStorage.setItem(
                "hunter_google_api_key",
                key
            );


            showStatus(
                "Configuração salva neste dispositivo.",
                "success"
            );


            if (connected) {

                connected.style.display =
                    "block";

            }

        }
    );


    /* =====================================================
       STATUS
       ===================================================== */

    function showStatus(text, type) {

        if (!status) {
            return;
        }


        status.style.display =
            "block";


        status.textContent =
            text;


        if (type === "success") {

            status.style.color =
                "#2ecc71";

        } else if (type === "error") {

            status.style.color =
                "#ff6b6b";

        } else {

            status.style.color =
                "#8ea8c4";

        }

    }


    /* =====================================================
       ESCONDER CONEXÃO
       ===================================================== */

    function hideConnected() {

        if (connected) {

            connected.style.display =
                "none";

        }

        if (saveButton) {

            saveButton.style.display =
                "none";

        }

    }


    /* =====================================================
       DELAY
       ===================================================== */

    function wait(milliseconds) {

        return new Promise(function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        });

    }

});
