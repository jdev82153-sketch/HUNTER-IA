document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
    const nameInput = document.getElementById("profile-name");
    const roleInput = document.getElementById("profile-role");
    const descriptionInput = document.getElementById("profile-description");
    const message = document.getElementById("profile-message");

    if (!profileForm) return;

    loadProfile();

    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!name) {
            showMessage("Digite seu nome.", "error");
            nameInput.focus();
            return;
        }

        const user = {
            name: name,
            role: role || "Vendedor",
            description: description || "Profissional de vendas utilizando o Hunter IA."
        };

        localStorage.setItem("hunter_user", JSON.stringify(user));
        localStorage.setItem("hunter_logged_in", "true");

        // Atualiza toda a interface
        if (window.HunterApp && typeof window.HunterApp.updateUserInterface === "function") {
            window.HunterApp.updateUserInterface(user);
        }

        showMessage("Perfil atualizado com sucesso!", "success");
    });

    function loadProfile() {
        const savedUser = localStorage.getItem("hunter_user");

        if (!savedUser) return;

        try {
            const user = JSON.parse(savedUser);

            nameInput.value = user.name || "";
            roleInput.value = user.role || "Vendedor";
            descriptionInput.value = user.description || "";

            updateProfileHeader(user);
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    }

    function updateProfileHeader(user) {
        const displayName = document.getElementById("profile-display-name");
        const largeAvatar = document.getElementById("profile-large-avatar");

        if (displayName) {
            displayName.textContent = user.name || "Vendedor";
        }

        if (largeAvatar) {
            largeAvatar.textContent = (user.name || "V").charAt(0).toUpperCase();
        }
    }

    function showMessage(text, type) {
        if (!message) return;

        message.textContent = text;
        message.className = "profile-message";
        message.classList.add(type);
    }
});
