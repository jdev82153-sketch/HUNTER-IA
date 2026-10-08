/* =========================================================
   HUNTER IA — APP.JS
   Fluxo principal + navegação + menu mobile
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const splash = document.getElementById("splash-screen");
    const loginScreen = document.getElementById("login-screen");
    const app = document.getElementById("app");

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const mobileMenuButton =
        document.getElementById("mobile-menu-button");


    /* =====================================================
       ENTRADA DO SISTEMA
       ===================================================== */

    function startHunter() {

        // Esconde o Splash
        if (splash) {
            splash.classList.add("fade-out");

            setTimeout(() => {
                splash.style.display = "none";
            }, 550);
        }


        // Verifica se existe sessão
        const loggedIn =
            localStorage.getItem("hunter_logged_in") === "true";


        if (loggedIn) {

            // Usuário já entrou anteriormente
            if (loginScreen) {
                loginScreen.classList.add("hidden");
            }

            if (app) {
                app.classList.remove("hidden");
            }

            loadUser();

            navigateTo("dashboard");

        } else {

            // Primeiro acesso
            if (app) {
                app.classList.add("hidden");
            }

            if (loginScreen) {
                loginScreen.classList.remove("hidden");
            }
        }
    }


    /*
       Aguarda o Splash terminar
    */
    setTimeout(startHunter, 1800);


    /* =====================================================
       NAVEGAÇÃO
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


        if (!targetPage) {

            console.error(
                "Hunter IA: página não encontrada:",
                pageName
            );

            return;
        }


        targetPage.classList.remove("hidden-page");
        targetPage.classList.add("active-page");


        // Atualiza menu
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove("active");

                if (
                    item.dataset.page === pageName
                ) {
                    item.classList.add("active");
                }

            });


        // Breadcrumb
        const breadcrumb =
            document.getElementById(
                "page-breadcrumb"
            );


        if (breadcrumb) {

            const names = {

                dashboard: "Dashboard",

                hunter: "Hunter IA",

                vendedor: "Vendedor IA",

                calculadora: "Calculadora",

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
       LINKS / BOTÕES DE NAVEGAÇÃO
       ===================================================== */

    document
        .querySelectorAll("[data-page]")
        .forEach(item => {

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const page =
                        item.dataset.page;

                    if (!page) return;

                    navigateTo(page);

                    closeMobileMenu();

                }
            );

        });


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    function openMobileMenu() {

        if (!sidebar) return;

        sidebar.classList.add(
            "mobile-open"
        );


        if (overlay) {

            overlay.classList.add(
                "visible"
            );
        }


        document.body.style.overflow =
            "hidden";
    }


    function closeMobileMenu() {

        if (!sidebar) return;

        sidebar.classList.remove(
            "mobile-open"
        );


        if (overlay) {

            overlay.classList.remove(
                "visible"
            );
        }


        document.body.style.overflow =
            "";
    }


    function toggleMobileMenu() {

        if (!sidebar) return;


        const opened =
            sidebar.classList.contains(
                "mobile-open"
            );


        if (opened) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }
    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileMenu();

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       USUÁRIO
       ===================================================== */

    function loadUser() {

        let user = {};


        try {

            user =
                JSON.parse(
                    localStorage.getItem(
                        "hunter_user"
                    )
                ) || {};

        } catch (error) {

            console.error(
                "Erro ao carregar usuário:",
                error
            );

            user = {};
        }


        const name =
            user.name || "Vendedor";


        // Dashboard
        const dashboardName =
            document.getElementById(
                "dashboard-user-name"
            );


        if (dashboardName) {

            dashboardName.textContent =
                `Olá, ${name}`;
        }


        // Nome no topo
        const topbarName =
            document.getElementById(
                "topbar-user-name"
            );


        if (topbarName) {

            topbarName.textContent =
                name;
        }


        // Inicial
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
            avatar.textContent = initial;
        }


        const largeAvatar =
            document.getElementById(
                "profile-large-avatar"
            );


        if (largeAvatar) {
            largeAvatar.textContent =
                initial;
        }


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
       MOSTRAR APP
       ===================================================== */

    function showApp() {

        if (splash) {
            splash.style.display =
                "none";
        }


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
    }


    /* =====================================================
       API INTERNA
       ===================================================== */

    window.HunterApp = {

        navigateTo,

        showApp,

        loadUser,

        openMobileMenu,

        closeMobileMenu

    };


});
