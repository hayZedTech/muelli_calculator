import { loadPage } from "../router.js";

export function initializeNavigation() {
    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
    const pageLinks = document.querySelectorAll('a[href^="#"]');
    const sidebar = document.getElementById("sidebar");

    if (!sidebarLinks.length && !pageLinks.length) return;

    const handleAnchorClick = (link, e) => {
        const href = link.getAttribute("href") || "";

        if (!href.startsWith("#") || href === "#") return;

        e.preventDefault();
        const targetId = href.slice(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offset = 24;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: "auto" });
        }

        if (link.closest(".sidebar-nav")) {
            sidebarLinks.forEach(item => {
                item.classList.toggle("active", item === link);
            });
        }

        if (sidebar && window.innerWidth <= 768) {
            sidebar.classList.remove("open");
        }
    };

    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href") || "";

            if (href.startsWith("#")) {
                handleAnchorClick(link, e);
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

    pageLinks.forEach(link => {
        if (link.closest(".sidebar-nav")) return;
        link.addEventListener("click", (e) => handleAnchorClick(link, e));
    });
}