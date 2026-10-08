document.addEventListener("DOMContentLoaded", function () {

    const splash = document.getElementById("splash-screen");
    const loginScreen = document.getElementById("login-screen");
    const app = document.getElementById("app");

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const mobileMenuButton = document.getElementById("mobile-menu-button");

    /*
    =====================================================
    INICIALIZAÇÃO
    =====================================================
    */

    function startApp() {

        // Remove o splash
        if (splash) {
            splash.classList.add("fade-out");

            setTimeout(function () {
                splash.style.display = "none";
                splash.remove();
            }, 500);
        }

        const loggedIn =
            localStorage.getItem("hunter_logged_in") === "true";

        if (loggedIn) {

            if (loginScreen) {
                loginScreen.classList.add("hidden");
            }

            if (app) {
                app.classList.remove("hidden");
            }

            loadUser();
            navigateTo("dashboard");

        } else {

            if (app) {
                app.classList.add("hidden");
            }

            if (loginScreen) {
                loginScreen.classList.remove("hidden");
            }
        }
    }


    /*
    =====================================================
    SPLASH
    =====================================================
    */

    setTimeout(startApp, 2000);


    /*
    =====================================================
    NAVEGAÇÃO
    =====================================================
    */

    function navigateTo(pageName) {

        const pages = document.querySelectorAll(".page");

        pages.forEach(function (page) {
            page.classList.remove("active-page");
            page.classList.add("hidden-page");
        });

        const target =
            document.getElementById("page-" + pageName);

        if (!target) {
            console.error("Página não encontrada:", pageName);
            return;
        }

        target.classList.remove("hidden-page");
        target.classList.add("active-page");

        document.querySelectorAll(".nav-item").forEach(function (item) {

            item.classList.remove("active");

            if (item.dataset.page === pageName) {
                item.classList.add("active");
            }
        });

        const breadcrumb =
            document.getElementById("page-breadcrumb");

        if (breadcrumb) {

            const names = {
                dashboard: "Dashboard",
                hunter: "Hunter IA",
                vendedor: "Vendedor IA",
                calculadora: "Calculadora de Preços",
                ofertas: "Gerador de Ofertas",
                treinador: "Treinador de Vendas",
                perfil: "Meu Perfil",
                configuracoes: "Configurações"
            };

            breadcrumb.textContent =
                names[pageName] || "Hunter IA";
        }

        window.scrollTo(0, 0);
    }


    /*
    =====================================================
    MENU
    =====================================================
    */

    function openMobileMenu() {

        if (!sidebar) return;

        sidebar.classList.add("mobile-open");

        if (overlay) {
            overlay.classList.add("visible");
        }

        document.body.style.overflow = "hidden";
    }


    function closeMobileMenu() {

        if (!sidebar) return;

        sidebar.classList.remove("mobile-open");

        if (overlay) {
            overlay.classList.remove("visible");
        }

        document.body.style.overflow = "";
    }


    function toggleMobileMenu() {

        if (!sidebar) return;

        if (sidebar.classList.contains("mobile-open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    /*
    =====================================================
    MENU LATERAL
    =====================================================
    */

    document.querySelectorAll("[data-page]").forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const page = item.dataset.page;

            if (!page) return;

            navigateTo(page);
            closeMobileMenu();
        });
    });


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            toggleMobileMenu();
        });
    }


    if (overlay) {

        overlay.addEventListener("click", function () {
            closeMobileMenu();
        });
    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /*
    =====================================================
    CARDS
    =====================================================
    */

    document.querySelectorAll(".tool-card").forEach(function (card) {

        card.addEventListener("click", function () {

            const page = card.dataset.page;

            if (!page) return;

            navigateTo(page);
        });

    });


    /*
    =====================================================
    USUÁRIO
    =====================================================
    */

    function loadUser() {

        let user = {};

        try {

            user =
                JSON.parse(
                    localStorage.getItem("hunter_user")
                ) || {};

        } catch (error) {

            console.error("Erro ao carregar usuário:", error);
            user = {};
        }

        const name = user.name || "Vendedor";

        const dashboardName =
            document.getElementById("dashboard-user-name");

        if (dashboardName) {
            dashboardName.textContent = "Olá, " + name;
        }

        const topbarName =
            document.getElementById("topbar-user-name");

        if (topbarName) {
            topbarName.textContent = name;
        }

        const initial =
            name.trim().charAt(0).toUpperCase() || "V";

        const avatar =
            document.getElementById("profile-avatar");

        if (avatar) {
            avatar.textContent = initial;
        }

        const largeAvatar =
            document.getElementById("profile-large-avatar");

        if (largeAvatar) {
            largeAvatar.textContent = initial;
        }

        const profileDisplay =
            document.getElementById("profile-display-name");

        if (profileDisplay) {
            profileDisplay.textContent = name;
        }

        const profileName =
            document.getElementById("profile-name");

        if (profileName && !profileName.value) {
            profileName.value = name;
        }
    }


    /*
    =====================================================
    ENTRAR NO APP DEPOIS DO LOGIN
    =====================================================
    */

    function showApp() {

        if (splash) {
            splash.style.display = "none";
        }

        if (loginScreen) {
            loginScreen.classList.add("hidden");
        }

        if (app) {
            app.classList.remove("hidden");
        }

        loadUser();
        navigateTo("dashboard");
    }


    /*
    =====================================================
    DISPONIBILIZA PARA O LOGIN.JS
    =====================================================
    */

    window.HunterApp = {
        navigateTo: navigateTo,
        showApp: showApp,
        loadUser: loadUser,
        openMobileMenu: openMobileMenu,
        closeMobileMenu: closeMobileMenu
    };

});
