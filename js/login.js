document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const nameInput = document.getElementById("login-name");
    const passwordInput = document.getElementById("login-password");
    const loginMessage = document.getElementById("login-message");

    if (!loginForm) return;

    // Preenche o nome salvo anteriormente
    const savedUser = localStorage.getItem("hunter_user");

    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);

            if (user.name) {
                nameInput.value = user.name;
            }
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        }
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        // Limpa mensagem anterior
        loginMessage.textContent = "";
        loginMessage.className = "login-message";

        // Validação
        if (!name) {
            showMessage("Digite seu nome para continuar.", "error");
            nameInput.focus();
            return;
        }

        if (!password) {
            showMessage("Digite sua senha para continuar.", "error");
            passwordInput.focus();
            return;
        }

        // Usuário local do Hunter IA
        const user = {
            name: name,
            role: "Vendedor",
            description: "Profissional de vendas utilizando o Hunter IA."
        };

        // Salva os dados
        localStorage.setItem("hunter_user", JSON.stringify(user));
        localStorage.setItem("hunter_logged_in", "true");

        showMessage("Login realizado! Entrando no Hunter IA...", "success");

        // Pequena animação antes de entrar
        setTimeout(() => {
            if (window.HunterApp && typeof window.HunterApp.showApp === "function") {
                window.HunterApp.showApp();
            } else {
                console.error("HunterApp não foi carregado.");
            }
        }, 500);
    });

    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.classList.add(type);
    }
});
