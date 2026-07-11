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

    initializeSidebar();
    initializeNavigation();
    initializeAnimations();
    initializeFaq();
    initializeEvents();
});
