import { loadPage } from "./router.js";
import { initializeSidebar } from "./ui/sidebar.js";
import { initializeNavigation } from "./ui/navigation.js";
import { initializeAnimations } from "./ui/animations.js";
import { initializeFaq } from "./ui/faq.js";

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

    // SPA START
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "hero";

    loadPage(page, false);
});