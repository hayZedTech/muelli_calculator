import { calculate } from "../core/calculator.js";
import { renderResults } from "./renderer.js";
import { validate } from "./validation.js";
import { debounce } from "../utils/debounce.js";

const STORAGE_KEY = "muelli-calculator";

export function initializeEvents() {
    const purchasePrice = document.getElementById("purchase-price");
    const propertyTypes = document.querySelectorAll("input[name='property-type']");
    const buyerStatuses = document.querySelectorAll("input[name='buyer-status']");
    const financingOptions = document.querySelectorAll("input[name='financing']");
    const resetButton = document.getElementById("reset-calculator");
    const exportButton = document.getElementById("export-pdf");
    const presetButtons = document.querySelectorAll(".preset-btn");

    if (!purchasePrice || !propertyTypes.length) {
        return;
    }

    function saveCalculator() {
        const data = {
            purchasePrice: purchasePrice.value,
            propertyType: document.querySelector("input[name='property-type']:checked")?.value,
            buyerStatus: document.querySelector("input[name='buyer-status']:checked")?.value,
            financing: document.querySelector("input[name='financing']:checked")?.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadCalculator() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            purchasePrice.value = "100000";
            return;
        }

        try {
            const data = JSON.parse(saved);
            purchasePrice.value = data.purchasePrice ?? "100000";

            propertyTypes.forEach((radio) => {
                radio.checked = radio.value === (data.propertyType ?? "resale");
            });
            buyerStatuses.forEach((radio) => {
                radio.checked = radio.value === (data.buyerStatus ?? "resident");
            });
            financingOptions.forEach((radio) => {
                radio.checked = radio.value === (data.financing ?? "equity");
            });
        } catch (error) {
            console.error(error);
            purchasePrice.value = "100000";
        }
    }

    function updateCalculator() {
        const data = {
            purchasePrice: Number(purchasePrice.value || 0),
            propertyType: document.querySelector("input[name='property-type']:checked")?.value || "resale",
            buyerStatus: document.querySelector("input[name='buyer-status']:checked")?.value || "resident",
            financing: document.querySelector("input[name='financing']:checked")?.value || "equity"
        };

        const validation = validate(data);
        if (!validation.valid) return;

        try {
            const result = calculate(data);
            renderResults(result);
            saveCalculator();
        } catch (error) {
            console.error(error);
        }
    }

    function resetCalculator() {
        purchasePrice.value = "100000";
        propertyTypes.forEach((radio) => {
            radio.checked = radio.value === "resale";
        });
        buyerStatuses.forEach((radio) => {
            radio.checked = radio.value === "resident";
        });
        financingOptions.forEach((radio) => {
            radio.checked = radio.value === "equity";
        });
        localStorage.removeItem(STORAGE_KEY);
        updateCalculator();
    }

    function exportPDF() {
        window.print();
    }

    const debouncedUpdate = debounce(updateCalculator, 250);

    purchasePrice.addEventListener("input", debouncedUpdate);
    purchasePrice.addEventListener("change", debouncedUpdate);

    propertyTypes.forEach((radio) => {
        radio.addEventListener("change", debouncedUpdate);
    });

    buyerStatuses.forEach((radio) => {
        radio.addEventListener("change", debouncedUpdate);
    });

    financingOptions.forEach((radio) => {
        radio.addEventListener("change", debouncedUpdate);
    });

    if (resetButton && !resetButton.dataset.bound) {
        resetButton.dataset.bound = "true";
        resetButton.addEventListener("click", resetCalculator);
    }

    if (exportButton && !exportButton.dataset.bound) {
        exportButton.dataset.bound = "true";
        exportButton.addEventListener("click", exportPDF);
    }

    presetButtons.forEach((button) => {
        button.addEventListener("click", () => {
            purchasePrice.value = button.dataset.price || "";
            debouncedUpdate();
        });
    });

    loadCalculator();
    updateCalculator();
}
