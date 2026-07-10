import { initializeEvents } from "./ui/events.js";
import { initializeFaq } from "./ui/faq.js";
import { initializeAnimations } from "./ui/animations.js";
import { DEFAULTS } from "./config/defaults.js";

const routes = {
    hero: "assets/sections/landing.html"
};

let currentPage = "hero";

function syncActiveLinks(page) {
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page || link.getAttribute("href") === "#hero");
    });
}

function initCalculatorDefaults() {
    const purchasePrice = document.getElementById("purchase-price");
    if (!purchasePrice) return;

    const region = document.getElementById("region");
    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");

    if (region) region.value = DEFAULTS.region;
    if (deposit) deposit.value = DEFAULTS.depositPercent;
    if (mortgageYears) mortgageYears.value = DEFAULTS.mortgageYears;
    if (interestRate) interestRate.value = DEFAULTS.interestRate;

    const type = DEFAULTS.propertyType;
    const propertyNew = document.getElementById("property-new");
    const propertyResale = document.getElementById("property-resale");

    if (propertyNew) propertyNew.checked = type === "new";
    if (propertyResale) propertyResale.checked = type !== "new";

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
            initCalculatorDefaults();
            initializeFaq();
        });
    } catch (e) {
        container.innerHTML = `<section class="info-section"><h2>Seite nicht gefunden</h2></section>`;
        console.error(e);
    }
}

window.addEventListener("popstate", () => {
    loadPage("hero", false);
});