import { initializeEvents } from "./ui/events.js";
import { initializeFaq } from "./ui/faq.js";
import { initializeAnimations } from "./ui/animations.js";
import { DEFAULTS } from "./config/defaults.js";

const routes = {
    hero: "assets/sections/hero.html",
    calculator: "assets/sections/calculator.html",
    guide: "assets/sections/guide.html",
    faq: "assets/sections/faq.html",
    contact: "assets/sections/contact.html",
    about: "assets/sections/about.html"
};

let currentPage = "hero";

function syncActiveLinks(page) {
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });
}

function initCalculatorDefaults() {

    const purchasePrice = document.getElementById("purchase-price");
    if (!purchasePrice) return;

    document.getElementById("region").value = DEFAULTS.region;
    document.getElementById("deposit").value = DEFAULTS.depositPercent;
    document.getElementById("mortgage-years").value = DEFAULTS.mortgageYears;
    document.getElementById("interest-rate").value = DEFAULTS.interestRate;

    const type = DEFAULTS.propertyType;

    document.getElementById("property-new").checked = type === "new";
    document.getElementById("property-resale").checked = type !== "new";

    initializeEvents();
}

export async function loadPage(page = "hero", pushState = true) {

    const container = document.getElementById("page-content");
    if (!container) return;

    const file = routes[page] || routes.hero;

    try {

        const res = await fetch(file);
        if (!res.ok) throw new Error(res.status);

        container.innerHTML = await res.text();

        currentPage = page;

        syncActiveLinks(page);

        if (pushState) {
            history.pushState({ page }, "", `?page=${page}`);
        }

        requestAnimationFrame(() => {

            initializeAnimations();

            if (page === "calculator") {
                initCalculatorDefaults();
            }

            if (page === "faq") {
                initializeFaq();
            }

        });

    } catch (e) {

        container.innerHTML = `<section class="info-section"><h2>Page not found</h2></section>`;
        console.error(e);
    }
}

window.addEventListener("popstate", (e) => {
    loadPage(e.state?.page || "hero", false);
});