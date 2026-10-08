/* =========================================================
   HUNTER IA — LOGIN.JS
   Login simples + armazenamento do usuário
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("login-form");

    const nameInput =
        document.getElementById("login-name");

    const passwordInput =
        document.getElementById("login-password");

    const loginMessage =
        document.getElementById("login-message");


    if (!loginForm) return;


    /* =====================================================
       VERIFICA SE JÁ ESTÁ LOGADO
       ===================================================== */

    const alreadyLogged =
        localStorage.getItem("hunter_logged_in") === "true";


    if (alreadyLogged) {

        const loginScreen =
            document.getElementById("login-screen");

        const app =
            document.getElementById("app");

        if (loginScreen) {
            loginScreen.classList.add("hidden");
        }

        if (app) {
            app.classList.remove("hidden");
        }

    }


    /* =====================================================
       SUBMIT DO LOGIN
       ===================================================== */

    loginForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value.trim()
                : "";


        /* =================================================
           VALIDAÇÃO DO NOME
           ================================================= */

        if (!name) {

            showMessage(
                "Digite seu nome para continuar."
            );

            if (nameInput) {
                nameInput.focus();
            }

            return;
        }


        /* =================================================
           VALIDAÇÃO DA SENHA
           ================================================= */

        if (!password) {

            showMessage(
                "Digite sua senha para continuar."
            );

            if (passwordInput) {
                passwordInput.focus();
            }

            return;
        }


        if (password.length < 4) {

            showMessage(
                "A senha precisa ter pelo menos 4 caracteres."
            );

            if (passwordInput) {
                passwordInput.focus();
            }

            return;
        }


        /* =================================================
           SALVA USUÁRIO
           ================================================= */

        const user = {

            name: name,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "hunter_user",
            JSON.stringify(user)
        );


        localStorage.setItem(
            "hunter_logged_in",
            "true"
        );


        /* =================================================
           FEEDBACK
           ================================================= */

        if (loginMessage) {

            loginMessage.textContent =
                "Entrando no Hunter IA...";

            loginMessage.style.color =
                "#22c55e";

        }


        /* =================================================
           ENTRA NO APP
           ================================================= */

        setTimeout(() => {

            if (
                window.HunterApp &&
                typeof window.HunterApp.showApp === "function"
            ) {

                window.HunterApp.showApp();

            } else {

                const loginScreen =
                    document.getElementById(
                        "login-screen"
                    );

                const app =
                    document.getElementById("app");


                if (loginScreen) {
                    loginScreen.classList.add("hidden");
                }

                if (app) {
                    app.classList.remove("hidden");
                }

            }

        }, 400);

    });


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function showMessage(message) {

        if (!loginMessage) return;

        loginMessage.textContent =
            message;

        loginMessage.style.color =
            "#ef4444";

    }


    /* =====================================================
       ENTER NOS CAMPOS
       ===================================================== */

    [nameInput, passwordInput]
        .filter(Boolean)
        .forEach(input => {

            input.addEventListener("input", () => {

                if (loginMessage) {
                    loginMessage.textContent = "";
                }

            });

        });

});
