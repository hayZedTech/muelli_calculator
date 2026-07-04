import { calculate } from "../core/calculator.js";
import { renderResults } from "./renderer.js";
import { validate } from "./validation.js";
import { debounce } from "../utils/debounce.js";
import { DEFAULTS } from "../config/defaults.js";
import { REGIONS } from "../config/regions.js";

const STORAGE_KEY = "muelli-calculator";

export function initializeEvents() {

    const purchasePrice = document.getElementById("purchase-price");
    const region = document.getElementById("region");
    REGIONS.forEach(({ id, name }) => {

    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    region.appendChild(option);

});

    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");

    const propertyTypes = document.querySelectorAll("input[name='property-type']");
    const resetButton = document.getElementById("reset-calculator");
    const exportButton = document.getElementById("export-pdf");

    if (
        !purchasePrice ||
        !region ||
        !deposit ||
        !mortgageYears ||
        !interestRate ||
        !propertyTypes.length
    ) {
        return;
    }

    function saveCalculator() {

        const data = {
            purchasePrice: purchasePrice.value,
            region: region.value,
            propertyType: document.querySelector("input[name='property-type']:checked")?.value,
            depositPercent: deposit.value,
            mortgageYears: mortgageYears.value,
            interestRate: interestRate.value
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    }

    function loadCalculator() {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return;

        try {

            const data = JSON.parse(saved);

            purchasePrice.value = data.purchasePrice ?? "";
            region.value = data.region ?? DEFAULTS.region;
            deposit.value = data.depositPercent ?? DEFAULTS.depositPercent;
            mortgageYears.value = data.mortgageYears ?? DEFAULTS.mortgageYears;
            interestRate.value = data.interestRate ?? DEFAULTS.interestRate;

            propertyTypes.forEach((radio) => {
                radio.checked = radio.value === data.propertyType;
            });

        } catch (error) {

            console.error(error);

        }

    }

    function updateCalculator() {

        const selectedPropertyType =
            document.querySelector("input[name='property-type']:checked")?.value;

        const data = {
            purchasePrice: Number(purchasePrice.value || 0),
            region: region.value,
            propertyType: selectedPropertyType,
            depositPercent: Number(deposit.value || 0),
            mortgageYears: Number(mortgageYears.value || 0),
            interestRate: Number(interestRate.value || 0)
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

        purchasePrice.value = "";
        region.value = DEFAULTS.region;
        deposit.value = DEFAULTS.depositPercent;
        mortgageYears.value = DEFAULTS.mortgageYears;
        interestRate.value = DEFAULTS.interestRate;

        propertyTypes.forEach((radio) => {
            radio.checked = radio.value === DEFAULTS.propertyType;
        });

        localStorage.removeItem(STORAGE_KEY);

        updateCalculator();

    }

    function exportPDF() {

        window.print();

    }

    const debouncedUpdate = debounce(updateCalculator, 250);

    [
        purchasePrice,
        region,
        deposit,
        mortgageYears,
        interestRate
    ].forEach((element) => {

        element.addEventListener("input", debouncedUpdate);
        element.addEventListener("change", debouncedUpdate);

    });

    propertyTypes.forEach((radio) => {

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

    loadCalculator();

    updateCalculator();

}