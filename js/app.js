/* =========================================================
   HUNTER IA — APP.JS
   Navegação + Menu Mobile
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const splash = document.getElementById("splash-screen");
    const loginScreen = document.getElementById("login-screen");
    const app = document.getElementById("app");

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const mobileMenuButton = document.getElementById("mobile-menu-button");

    const navItems = document.querySelectorAll("[data-page]");


    /* =====================================================
       SPLASH
       ===================================================== */

    setTimeout(() => {

        if (splash) {

            splash.classList.add("fade-out");

            setTimeout(() => {
                splash.style.display = "none";
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

    }, 1800);


    /* =====================================================
       NAVEGAÇÃO
       ===================================================== */

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const page = item.dataset.page;

            if (!page) return;

            navigateTo(page);

            closeMobileMenu();

        });

    });


    /* =====================================================
       CARDS
       ===================================================== */

    document.querySelectorAll(".tool-card").forEach(card => {

        card.addEventListener("click", () => {

            const page = card.dataset.page;

            if (!page) return;

            navigateTo(page);

        });

    });


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            toggleMobileMenu();

        });

    }


    if (overlay) {

        overlay.addEventListener("click", () => {

            closeMobileMenu();

        });

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


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

        const isOpen =
            sidebar.classList.contains("mobile-open");

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    /* =====================================================
       NAVEGAR PARA UMA PÁGINA
       ===================================================== */

    function navigateTo(pageName) {

        const pages =
            document.querySelectorAll(".page");


        pages.forEach(page => {

            page.classList.remove("active-page");
            page.classList.add("hidden-page");

        });


        const targetPage =
            document.getElementById(
                `page-${pageName}`
            );


        if (!targetPage) return;


        targetPage.classList.remove("hidden-page");
        targetPage.classList.add("active-page");


        document.querySelectorAll(".nav-item").forEach(item => {

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
                perfil: "Meu Perfil"

            };

            breadcrumb.textContent =
                names[pageName] || "Hunter IA";

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       CARREGAR USUÁRIO
       ===================================================== */

    function loadUser() {

        let user = {};

        try {

            user =
                JSON.parse(
                    localStorage.getItem("hunter_user")
                ) || {};

        } catch (error) {

            user = {};

        }


        const name =
            user.name ||
            "Vendedor";


        /* Dashboard */

        const dashboardName =
            document.getElementById(
                "dashboard-user-name"
            );


        if (dashboardName) {

            dashboardName.textContent =
                `Olá, ${name}`;

        }


        /* Topbar */

        const topbarName =
            document.getElementById(
                "topbar-user-name"
            );


        if (topbarName) {

            topbarName.textContent =
                name;

        }


        /* Avatar */

        const initial =
            name
                .trim()
                .charAt(0)
                .toUpperCase() || "V";


        const avatar =
            document.getElementById(
                "profile-avatar"
            );


        if (avatar) {

            avatar.textContent =
                initial;

        }


        const largeAvatar =
            document.getElementById(
                "profile-large-avatar"
            );


        if (largeAvatar) {

            largeAvatar.textContent =
                initial;

        }


        /* Perfil */

        const profileDisplay =
            document.getElementById(
                "profile-display-name"
            );


        if (profileDisplay) {

            profileDisplay.textContent =
                name;

        }


        const profileName =
            document.getElementById(
                "profile-name"
            );


        if (
            profileName &&
            !profileName.value
        ) {

            profileName.value =
                name;

        }

    }


    /* =====================================================
       API PÚBLICA
       ===================================================== */

    window.HunterApp = {

        navigateTo,

        showApp: () => {

            if (loginScreen) {

                loginScreen.classList.add(
                    "hidden"
                );

            }


            if (app) {

                app.classList.remove(
                    "hidden"
                );

            }


            loadUser();

            navigateTo("dashboard");

        },

        loadUser,

        openMobileMenu,

        closeMobileMenu

    };

});
