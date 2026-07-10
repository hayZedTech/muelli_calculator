import { initializeSidebar } from "./ui/sidebar.js";
import { initializeNavigation } from "./ui/navigation.js";
import { initializeAnimations } from "./ui/animations.js";
import { initializeFaq } from "./ui/faq.js";
import { initializeEvents } from "./ui/events.js";

async function loadPartial(id, file) {
    const container = document.getElementById(id);
    if (!container) return;

    const res = await fetch(file);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    container.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {

    await loadPartial("sidebar-container", "assets/partials/sidebar.html");
    await loadPartial("header-container", "assets/partials/header.html");
    await loadPartial("footer-container", "assets/partials/footer.html");

    // 🔥 IMPORTANT: init AFTER DOM injection
    initializeSidebar();
    initializeNavigation();
    initializeAnimations();
    initializeFaq();

    const pageContent = document.getElementById("page-content");

    if (pageContent && pageContent.children.length > 0) {
        initializeEvents();
        return;
    }

    // Fallback for older SPA-style usage
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "hero";

    const { loadPage } = await import("./router.js");
    loadPage(page, false);
});