document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("menu-button");
    const menu = document.getElementById("main-navigation");

    if (!button || !menu) {
        return;
    }

    button.addEventListener("click", function () {

        menu.classList.toggle("mobile-open");

        const opened = menu.classList.contains("mobile-open");

        button.setAttribute(
            "aria-expanded",
            opened ? "true" : "false"
        );

        button.setAttribute(
            "aria-label",
            opened
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

    menu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("mobile-open");

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            button.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

});
