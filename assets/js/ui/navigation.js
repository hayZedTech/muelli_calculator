import { loadPage } from "../router.js";

export function initializeNavigation() {

    const links = document.querySelectorAll(".sidebar-nav a");
    const sidebar = document.getElementById("sidebar");

    if (!links.length) return;

    links.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const page = link.getAttribute("data-page");
            if (!page) return;

            loadPage(page);

            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove("open");
            }

        });

    });
}