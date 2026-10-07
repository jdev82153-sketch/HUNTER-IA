document.addEventListener("DOMContentLoaded", () => {
    const dashboardName = document.getElementById("dashboard-user-name");
    const topbarName = document.getElementById("topbar-user-name");

    if (!dashboardName && !topbarName) return;

    loadDashboard();

    function loadDashboard() {
        const savedUser = localStorage.getItem("hunter_user");

        if (!savedUser) {
            setDefaultName();
            return;
        }

        try {
            const user = JSON.parse(savedUser);

            const name = user.name || "Vendedor";

            updateNames(name);
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
            setDefaultName();
        }
    }

    function updateNames(name) {
        if (dashboardName) {
            dashboardName.textContent = `Olá, ${name}`;
        }

        if (topbarName) {
            topbarName.textContent = name;
        }
    }

    function setDefaultName() {
        updateNames("Vendedor");
    }

    // Atualiza o nome quando o usuário volta para o Dashboard
    window.addEventListener("storage", () => {
        loadDashboard();
    });
});
