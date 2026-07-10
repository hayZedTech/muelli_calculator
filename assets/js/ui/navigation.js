import { loadPage } from "../router.js";

export function initializeNavigation() {
    const links = document.querySelectorAll(".sidebar-nav a");
    const sidebar = document.getElementById("sidebar");

    if (!links.length) return;

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href") || "";

            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.slice(1);
                const target = document.getElementById(targetId);

                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }

                links.forEach(item => {
                    item.classList.toggle("active", item === link);
                });

                if (sidebar && window.innerWidth <= 768) {
                    sidebar.classList.remove("open");
                }

                return;
            }

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