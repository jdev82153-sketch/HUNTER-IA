/* =========================================================
   HUNTER IA — LOGIN.JS
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


    // Se o formulário não existir, não faz nada
    if (!loginForm) return;


    /* =====================================================
       CARREGAR USUÁRIO SALVO
       ===================================================== */

    const savedUser =
        localStorage.getItem("hunter_user");


    if (savedUser && nameInput) {

        try {

            const user =
                JSON.parse(savedUser);

            if (user.name) {
                nameInput.value = user.name;
            }

        } catch (error) {

            console.error(
                "Erro ao carregar usuário:",
                error
            );

        }
    }


    /* =====================================================
       LOGIN
       ===================================================== */

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value.trim()
                    : "";


            clearMessage();


            /* -----------------------------
               VALIDAÇÕES
               ----------------------------- */

            if (!name) {

                showMessage(
                    "Digite seu nome para continuar.",
                    "error"
                );

                if (nameInput) {
                    nameInput.focus();
                }

                return;
            }


            if (!password) {

                showMessage(
                    "Digite sua senha para continuar.",
                    "error"
                );

                if (passwordInput) {
                    passwordInput.focus();
                }

                return;
            }


            /* -----------------------------
               CRIAR USUÁRIO
               ----------------------------- */

            const user = {

                name: name,

                role: "Vendedor",

                description:
                    "Profissional de vendas utilizando o Hunter IA."

            };


            localStorage.setItem(
                "hunter_user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "hunter_logged_in",
                "true"
            );


            showMessage(
                "Login realizado! Entrando...",
                "success"
            );


            /* -----------------------------
               ENTRAR NO APP
               ----------------------------- */

            setTimeout(() => {

                if (
                    window.HunterApp &&
                    typeof window.HunterApp.showApp ===
                    "function"
                ) {

                    window.HunterApp.showApp();

                } else {

                    console.error(
                        "HunterApp não foi carregado."
                    );

                }

            }, 500);

        }
    );


    /* =====================================================
       MENSAGENS
       ===================================================== */

    function showMessage(message, type) {

        if (!loginMessage) return;

        loginMessage.textContent =
            message;

        loginMessage.className =
            "login-message " + type;
    }


    function clearMessage() {

        if (!loginMessage) return;

        loginMessage.textContent = "";

        loginMessage.className =
            "login-message";
    }

});
