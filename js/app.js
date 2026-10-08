/* =========================================================
   HUNTER IA — APP.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const splash =
        document.getElementById("splash-screen");

    const loginScreen =
        document.getElementById("login-screen");

    const app =
        document.getElementById("app");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebar-overlay");

    const mobileButton =
        document.getElementById("mobile-menu-button");


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


        const logged =
            localStorage.getItem(
                "hunter_logged_in"
            ) === "true";


        if (logged) {

            loginScreen?.classList.add("hidden");

            app?.classList.remove("hidden");

            loadUser();

            navigateTo("dashboard");

        } else {

            app?.classList.add("hidden");

            loginScreen?.classList.remove("hidden");

        }

    }, 1200);


    /* =====================================================
       NAVEGAÇÃO
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
       CARDS
       ===================================================== */

    document
        .querySelectorAll(".tool-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const page =
                        card.dataset.page;

                    if (page) {
                        navigateTo(page);
                    }

                }
            );

        });


    /* =====================================================
       MOBILE
       ===================================================== */

    mobileButton?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            if (
                sidebar?.classList.contains(
                    "mobile-open"
                )
            ) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    overlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    function openMobileMenu() {

        sidebar?.classList.add(
            "mobile-open"
        );

        overlay?.classList.add(
            "visible"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeMobileMenu() {

        sidebar?.classList.remove(
            "mobile-open"
        );

        overlay?.classList.remove(
            "visible"
        );

        document.body.style.overflow = "";

    }


    /* =====================================================
       NAVEGAR
       ===================================================== */

    function navigateTo(pageName) {

        document
            .querySelectorAll(".page")
            .forEach(page => {

                page.classList.remove(
                    "active-page"
                );

                page.classList.add(
                    "hidden-page"
                );

            });


        const target =
            document.getElementById(
                `page-${pageName}`
            );


        if (!target) return;


        target.classList.remove(
            "hidden-page"
        );

        target.classList.add(
            "active-page"
        );


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.toggle(
                    "active",
                    item.dataset.page === pageName
                );

            });


        const breadcrumb =
            document.getElementById(
                "page-breadcrumb"
            );


        const names = {

            dashboard:
                "Hunter IA / Dashboard",

            hunter:
                "Hunter IA / Assistente",

            vendedor:
                "Hunter IA / Vendedor IA",

            calculadora:
                "Hunter IA / Calculadora",

            ofertas:
                "Hunter IA / Gerador de Ofertas",

            treinador:
                "Hunter IA / Treinador",

            perfil:
                "Hunter IA / Meu Perfil"

        };


        if (breadcrumb) {

            breadcrumb.textContent =
                names[pageName] ||
                "Hunter IA";

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       LIMPAR NOME
       ===================================================== */

    function normalizarNome(nome) {

        if (!nome) {
            return "Vendedor";
        }


        let resultado =
            String(nome).trim();


        resultado =
            resultado.replace(
                /^olá[\s,]+/i,
                ""
            );


        resultado =
            resultado.replace(
                /^ola[\s,]+/i,
                ""
            );


        return (
            resultado.trim() ||
            "Vendedor"
        );

    }


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

        } catch {

            user = {};

        }


        const name =
            normalizarNome(
                user.name
            );


        /*
         * Salva o nome limpo.
         */

        user.name = name;


        localStorage.setItem(
            "hunter_user",
            JSON.stringify(user)
        );


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

        const topName =
            document.getElementById(
                "topbar-user-name"
            );


        if (topName) {

            topName.textContent =
                name;

        }


        /* Avatar */

        const initial =
            name
                .charAt(0)
                .toUpperCase();


        document
            .querySelectorAll(
                "#profile-avatar, #profile-large-avatar"
            )
            .forEach(element => {

                element.textContent =
                    initial || "V";

            });


        const profileName =
            document.getElementById(
                "profile-name"
            );


        if (profileName) {

            profileName.value =
                name;

        }


        const profileDisplay =
            document.getElementById(
                "profile-display-name"
            );


        if (profileDisplay) {

            profileDisplay.textContent =
                name;

        }

    }


    /* =====================================================
       API
       ===================================================== */

    window.HunterApp = {

        navigateTo,

        loadUser,

        openMobileMenu,

        closeMobileMenu,

        showApp() {

            loginScreen?.classList.add(
                "hidden"
            );

            app?.classList.remove(
                "hidden"
            );

            loadUser();

            navigateTo("dashboard");

        }

    };

});
