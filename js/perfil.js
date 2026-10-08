/* =========================================================
   HUNTER IA — PERFIL.JS
   Gerenciamento do perfil do usuário
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const nomeInput =
        document.getElementById("profile-name");

    const salvarButton =
        document.getElementById("profile-save");

    const mensagem =
        document.getElementById("profile-message");


    if (
        !nomeInput ||
        !salvarButton ||
        !mensagem
    ) {
        return;
    }


    /* =====================================================
       CARREGAR PERFIL
       ===================================================== */

    carregarPerfil();


    /* =====================================================
       SALVAR PERFIL
       ===================================================== */

    salvarButton.addEventListener("click", () => {

        const nome =
            nomeInput.value.trim();


        if (!nome) {

            mostrarMensagem(
                "Digite seu nome antes de salvar.",
                "error"
            );

            nomeInput.focus();

            return;
        }


        let usuario = {};

        try {

            usuario =
                JSON.parse(
                    localStorage.getItem("hunter_user")
                ) || {};

        } catch (error) {

            usuario = {};

        }


        usuario.name =
            nome;


        localStorage.setItem(
            "hunter_user",
            JSON.stringify(usuario)
        );


        /* Atualiza o restante do sistema */

        if (
            window.HunterApp &&
            typeof window.HunterApp.loadUser === "function"
        ) {

            window.HunterApp.loadUser();

        }


        mostrarMensagem(
            "Perfil atualizado com sucesso! ✅",
            "success"
        );

    });


    /* =====================================================
       ENTER
       ===================================================== */

    nomeInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            salvarButton.click();

        }

    });


    /* =====================================================
       CARREGAR PERFIL
       ===================================================== */

    function carregarPerfil() {

        let usuario = {};

        try {

            usuario =
                JSON.parse(
                    localStorage.getItem("hunter_user")
                ) || {};

        } catch (error) {

            usuario = {};

        }


        if (usuario.name) {

            nomeInput.value =
                usuario.name;

        }

    }


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function mostrarMensagem(texto, tipo) {

        mensagem.textContent =
            texto;

        mensagem.classList.remove(
            "hidden",
            "success",
            "error"
        );


        if (tipo) {

            mensagem.classList.add(
                tipo
            );

        }


        setTimeout(() => {

            mensagem.classList.add(
                "hidden"
            );

        }, 3500);

    }

});
