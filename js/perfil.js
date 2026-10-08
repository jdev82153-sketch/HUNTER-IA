/* =========================================================
   HUNTER IA — PERFIL
   Nome + Foto de Perfil
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const nameInput =
        document.getElementById("profile-name");

    const photoInput =
        document.getElementById("profile-photo");

    const saveButton =
        document.getElementById("profile-save");

    const removePhotoButton =
        document.getElementById("profile-remove-photo");

    const message =
        document.getElementById("profile-message");

    const profileAvatar =
        document.getElementById("profile-large-avatar");


    if (!nameInput) return;


    /* =====================================================
       CARREGAR PERFIL
       ===================================================== */

    carregarPerfil();


    /* =====================================================
       ESCOLHER FOTO
       ===================================================== */

    if (photoInput) {

        photoInput.addEventListener("change", event => {

            const file =
                event.target.files[0];

            if (!file) return;


            if (!file.type.startsWith("image/")) {

                mostrarMensagem(
                    "Escolha uma imagem válida.",
                    true
                );

                return;
            }


            const reader =
                new FileReader();


            reader.onload = event => {

                redimensionarImagem(
                    event.target.result,
                    imagem => {

                        aplicarFoto(imagem);

                        localStorage.setItem(
                            "hunter_profile_photo",
                            imagem
                        );

                        mostrarMensagem(
                            "Foto atualizada com sucesso!"
                        );

                    }
                );

            };


            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       SALVAR NOME
       ===================================================== */

    if (saveButton) {

        saveButton.addEventListener("click", salvarPerfil);

    }


    /* =====================================================
       ENTER NO NOME
       ===================================================== */

    nameInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            salvarPerfil();

        }

    });


    /* =====================================================
       REMOVER FOTO
       ===================================================== */

    if (removePhotoButton) {

        removePhotoButton.addEventListener("click", () => {

            localStorage.removeItem(
                "hunter_profile_photo"
            );

            aplicarFoto(null);

            if (photoInput) {
                photoInput.value = "";
            }

            mostrarMensagem(
                "Foto removida."
            );

        });

    }


    /* =====================================================
       SALVAR PERFIL
       ===================================================== */

    function salvarPerfil() {

        const name =
            nameInput.value.trim();


        if (!name) {

            mostrarMensagem(
                "Digite seu nome.",
                true
            );

            nameInput.focus();

            return;

        }


        let user = {};

        try {

            user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};

        } catch (error) {

            user = {};

        }


        user.name = name;


        localStorage.setItem(
            "hunter_user",
            JSON.stringify(user)
        );


        /*
         * Atualiza o restante do sistema
         */

        if (
            window.HunterApp &&
            typeof window.HunterApp.loadUser === "function"
        ) {

            window.HunterApp.loadUser();

        }


        mostrarMensagem(
            "Perfil atualizado com sucesso!"
        );

    }


    /* =====================================================
       CARREGAR PERFIL
       ===================================================== */

    function carregarPerfil() {

        let user = {};

        try {

            user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};

        } catch (error) {

            user = {};

        }


        if (user.name) {

            nameInput.value =
                user.name;

        }


        const photo =
            localStorage.getItem(
                "hunter_profile_photo"
            );


        if (photo) {

            aplicarFoto(photo);

        }

    }


    /* =====================================================
       APLICAR FOTO
       ===================================================== */

    function aplicarFoto(photo) {

        if (!profileAvatar) return;


        if (photo) {

            profileAvatar.style.backgroundImage =
                `url("${photo}")`;

            profileAvatar.classList.add(
                "has-photo"
            );

            profileAvatar.textContent = "";

        } else {

            profileAvatar.style.backgroundImage =
                "";

            profileAvatar.classList.remove(
                "has-photo"
            );


            let user = {};

            try {

                user =
                    JSON.parse(
                        localStorage.getItem(
                            "hunter_user"
                        )
                    ) || {};

            } catch (error) {

                user = {};

            }


            const name =
                user.name ||
                "Vendedor";


            profileAvatar.textContent =
                name
                    .trim()
                    .charAt(0)
                    .toUpperCase() || "V";

        }


        /*
         * Atualiza também os outros avatares
         */

        atualizarAvatarPrincipal(photo);

    }


    /* =====================================================
       ATUALIZAR AVATAR DO SISTEMA
       ===================================================== */

    function atualizarAvatarPrincipal(photo) {

        const avatar =
            document.getElementById(
                "profile-avatar"
            );


        if (!avatar) return;


        if (photo) {

            avatar.style.backgroundImage =
                `url("${photo}")`;

            avatar.classList.add(
                "has-photo"
            );

            avatar.textContent = "";

        } else {

            avatar.style.backgroundImage =
                "";

            avatar.classList.remove(
                "has-photo"
            );


            let user = {};

            try {

                user =
                    JSON.parse(
                        localStorage.getItem(
                            "hunter_user"
                        )
                    ) || {};

            } catch (error) {

                user = {};

            }


            const name =
                user.name ||
                "Vendedor";


            avatar.textContent =
                name
                    .trim()
                    .charAt(0)
                    .toUpperCase() || "V";

        }

    }


    /* =====================================================
       REDIMENSIONAR IMAGEM
       ===================================================== */

    function redimensionarImagem(
        source,
        callback
    ) {

        const img =
            new Image();


        img.onload = () => {

            const tamanhoMaximo = 512;

            let largura =
                img.width;

            let altura =
                img.height;


            if (
                largura > tamanhoMaximo ||
                altura > tamanhoMaximo
            ) {

                if (largura > altura) {

                    altura =
                        altura *
                        (tamanhoMaximo / largura);

                    largura =
                        tamanhoMaximo;

                } else {

                    largura =
                        largura *
                        (tamanhoMaximo / altura);

                    altura =
                        tamanhoMaximo;

                }

            }


            const canvas =
                document.createElement(
                    "canvas"
                );


            canvas.width =
                largura;

            canvas.height =
                altura;


            const ctx =
                canvas.getContext(
                    "2d"
                );


            ctx.drawImage(
                img,
                0,
                0,
                largura,
                altura
            );


            const resultado =
                canvas.toDataURL(
                    "image/jpeg",
                    0.82
                );


            callback(resultado);

        };


        img.src =
            source;

    }


    /* =====================================================
       MENSAGEM
       ===================================================== */

    function mostrarMensagem(
        texto,
        erro = false
    ) {

        if (!message) return;


        message.textContent =
            texto;


        message.classList.remove(
            "error"
        );


        if (erro) {

            message.classList.add(
                "error"
            );

        }


        setTimeout(() => {

            message.textContent = "";

            message.classList.remove(
                "error"
            );

        }, 3500);

    }

});
