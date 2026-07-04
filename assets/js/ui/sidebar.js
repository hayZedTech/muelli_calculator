export function initializeSidebar() {

    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    function bind() {

        const openButton = document.getElementById("header-menu-toggle");
        const closeButton = document.getElementById("sidebar-toggle");
        const header = document.querySelector(".site-header");

        if (!openButton || !closeButton) return false;

        if (!openButton.dataset.bound) {

            openButton.dataset.bound = "true";

            openButton.addEventListener("click", () => {

                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("open");
                } else {
                    sidebar.classList.toggle("collapsed");
                    if (header) {
                        header.style.left = sidebar.classList.contains("collapsed") ? "70px" : "260px";
                    }
                }

            });

        }

        if (!closeButton.dataset.bound) {

            closeButton.dataset.bound = "true";

            closeButton.addEventListener("click", () => {

                if (window.innerWidth <= 768) {
                    sidebar.classList.remove("open");
                } else {
                    sidebar.classList.add("collapsed");
                    if (header) {
                        header.style.left = "70px";
                    }
                }

            });

        }

        return true;
    }

    // wait until partials exist
    const interval = setInterval(() => {
        if (bind()) clearInterval(interval);
    }, 50);

}