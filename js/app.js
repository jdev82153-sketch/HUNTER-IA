/* =========================================================
   HUNTER IA
   APP.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ====================================================== */

    const splashScreen = document.getElementById("splash-screen");
    const loginScreen = document.getElementById("login-screen");
    const app = document.getElementById("app");

    const sidebar = document.getElementById("sidebar");
    const sidebarOpen = document.getElementById("sidebar-open");
    const sidebarClose = document.getElementById("sidebar-close");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    const navItems = document.querySelectorAll(".nav-item");
    const pageButtons = document.querySelectorAll("[data-page]");

    const pageBreadcrumb = document.getElementById("page-breadcrumb");


    /* =====================================================
       CONFIGURAÇÃO
    ====================================================== */

    const SPLASH_TIME = 1800;

    const pageNames = {
        dashboard: "Dashboard",
        vendedor: "Vendedor IA",
        calculadora: "Calculador de Preços",
        ofertas: "Gerador de Ofertas",
        treinador: "Treinador de Vendas",
        perfil: "Meu Perfil"
    };


    /* =====================================================
       INICIALIZAÇÃO
    ====================================================== */

    initializeApp();


    function initializeApp() {

        startSplash();

        setupNavigation();

        setupMobileSidebar();

        setupToolCards();

        loadUserData();

    }


    /* =====================================================
       SPLASH SCREEN
    ====================================================== */

    function startSplash() {

        if (!splashScreen) {
            showLogin();
            return;
        }

        setTimeout(() => {

            splashScreen.style.opacity = "0";

            splashScreen.style.pointerEvents = "none";

            setTimeout(() => {

                splashScreen.classList.add("hidden");

                const loggedIn =
                    localStorage.getItem("hunter_logged_in") === "true";

                if (loggedIn) {
                    showApp();
                } else {
                    showLogin();
                }

            }, 450);

        }, SPLASH_TIME);

    }


    /* =====================================================
       LOGIN
    ====================================================== */

    function showLogin() {

        if (splashScreen) {
            splashScreen.classList.add("hidden");
        }

        if (app) {
            app.classList.add("hidden");
        }

        if (loginScreen) {
            loginScreen.classList.remove("hidden");
        }

    }


    /* =====================================================
       APP
    ====================================================== */

    function showApp() {

        if (loginScreen) {
            loginScreen.classList.add("hidden");
        }

        if (app) {
            app.classList.remove("hidden");
        }

        loadUserData();

        navigateTo("dashboard");

    }


    /* =====================================================
       NAVEGAÇÃO
    ====================================================== */

    function setupNavigation() {

        pageButtons.forEach(button => {

            button.addEventListener("click", () => {

                const page =
                    button.dataset.page;

                if (!page) {
                    return;
                }

                navigateTo(page);

            });

        });

    }


    function navigateTo(pageName) {

        if (!pageNames[pageName]) {
            pageName = "dashboard";
        }


        /* ---------------------------------------------
           Esconde todas as páginas
        ---------------------------------------------- */

        const pages =
            document.querySelectorAll(".page");

        pages.forEach(page => {

            page.classList.remove("active-page");

            page.classList.add("hidden-page");

        });


        /* ---------------------------------------------
           Mostra a página selecionada
        ---------------------------------------------- */

        const selectedPage =
            document.getElementById(`page-${pageName}`);

        if (selectedPage) {

            selectedPage.classList.remove("hidden-page");

            selectedPage.classList.add("active-page");

        }


        /* ---------------------------------------------
           Atualiza menu lateral
        ---------------------------------------------- */

        navItems.forEach(item => {

            item.classList.remove("active");

            if (item.dataset.page === pageName) {
                item.classList.add("active");
            }

        });


        /* ---------------------------------------------
           Atualiza breadcrumb
        ---------------------------------------------- */

        if (pageBreadcrumb) {

            pageBreadcrumb.textContent =
                pageNames[pageName];

        }


        /* ---------------------------------------------
           Fecha menu no celular
        ---------------------------------------------- */

        closeMobileSidebar();


        /* ---------------------------------------------
           Volta para o topo
        ---------------------------------------------- */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       CARDS DAS FERRAMENTAS
    ====================================================== */

    function setupToolCards() {

        const cards =
            document.querySelectorAll(".tool-card");

        cards.forEach(card => {

            card.addEventListener("click", event => {

                /*
                 Evita que o clique no botão
                 seja executado duas vezes.
                */

                if (
                    event.target.closest(".tool-button")
                ) {
                    return;
                }

                const page =
                    card.dataset.page;

                if (page) {
                    navigateTo(page);
                }

            });

        });

    }


    /* =====================================================
       SIDEBAR MOBILE
    ====================================================== */

    function setupMobileSidebar() {

        if (sidebarOpen) {

            sidebarOpen.addEventListener(
                "click",
                openMobileSidebar
            );

        }


        if (sidebarClose) {

            sidebarClose.addEventListener(
                "click",
                closeMobileSidebar
            );

        }


        if (sidebarOverlay) {

            sidebarOverlay.addEventListener(
                "click",
                closeMobileSidebar
            );

        }

    }


    function openMobileSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";

    }


    function closeMobileSidebar() {

        if (sidebar) {
            sidebar.classList.remove("mobile-open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       DADOS DO USUÁRIO
    ====================================================== */

    function loadUserData() {

        const savedUser =
            localStorage.getItem("hunter_user");

        if (!savedUser) {
            return;
        }

        try {

            const user =
                JSON.parse(savedUser);

            updateUserInterface(user);

        } catch (error) {

            console.warn(
                "Não foi possível carregar os dados do usuário."
            );

        }

    }


    function updateUserInterface(user) {

        if (!user) {
            return;
        }

        const name =
            user.name || "Usuário";

        const dashboardName =
            document.getElementById(
                "dashboard-user-name"
            );

        const topbarName =
            document.getElementById(
                "topbar-user-name"
            );

        const profileName =
            document.getElementById(
                "profile-display-name"
            );

        const profileInput =
            document.getElementById(
                "profile-name"
            );

        const avatar =
            document.getElementById(
                "profile-avatar"
            );

        const largeAvatar =
            document.getElementById(
                "profile-large-avatar"
            );


        if (dashboardName) {
            dashboardName.textContent = name;
        }

        if (topbarName) {
            topbarName.textContent = name;
        }

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileInput) {
            profileInput.value = name;
        }


        const firstLetter =
            name.trim().charAt(0).toUpperCase() || "U";

        if (avatar) {
            avatar.textContent = firstLetter;
        }

        if (largeAvatar) {
            largeAvatar.textContent = firstLetter;
        }


        const roleInput =
            document.getElementById("profile-role");

        const descriptionInput =
            document.getElementById(
                "profile-description"
            );


        if (roleInput && user.role) {
            roleInput.value = user.role;
        }

        if (
            descriptionInput &&
            user.description
        ) {
            descriptionInput.value =
                user.description;
        }

    }


    /* =====================================================
       FUNÇÕES GLOBAIS
       Outros arquivos podem usar estas funções.
    ====================================================== */

    window.HunterApp = {

        navigateTo,

        showApp,

        showLogin,

        loadUserData,

        updateUserInterface,

        openMobileSidebar,

        closeMobileSidebar

    };

});
