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
    const zone = document.getElementById("zone");
    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");

    const propertyTypes = document.querySelectorAll("input[name='property-type']");
    const buyerStatuses = document.querySelectorAll("input[name='buyer-status']");
    const financingOptions = document.querySelectorAll("input[name='financing']");
    const resetButton = document.getElementById("reset-calculator");
    const exportButton = document.getElementById("export-pdf");
    const zoneLabel = document.getElementById("zone-total-label");
    const percentageNote = document.getElementById("cost-percentage-note");
    const consultationForm = document.getElementById("consultation-form");
    const zoneOptions = {
        andalusia: [
            "Tarifa",
            "Barbate / Zahara de los Atunes",
            "Vejer",
            "Chiclana",
            "Conil",
            "Cádiz",
            "El Puerto de Santa María",
            "Sanlúcar de Barrameda"
        ],
        aragon: ["Zaragoza", "Huesca", "Teruel"],
        asturias: ["Oviedo", "Gijón", "Avilés"],
        balearic: ["Palma de Mallorca", "Ibiza", "Menorca"],
        basque: ["Bilbao", "San Sebastián", "Vitoria-Gasteiz"],
        canary: ["Santa Cruz de Tenerife", "Las Palmas", "Arrecife"],
        cantabria: ["Santander", "Torrelavega", "Camargo"],
        castillaLaMancha: ["Toledo", "Albacete", "Ciudad Real"],
        castillaLeon: ["Valladolid", "Salamanca", "León"],
        catalonia: ["Barcelona", "Girona", "Tarragona"],
        extremadura: ["Cáceres", "Badajoz", "Mérida"],
        galicia: ["A Coruña", "Vigo", "Santiago de Compostela"],
        laRioja: ["Logroño", "Calahorra", "Arnedo"],
        madrid: ["Madrid", "Alcorcón", "Getafe"],
        murcia: ["Murcia", "Cartagena", "Lorca"],
        navarre: ["Pamplona", "Tudela", "Estella"],
        valencia: ["Valencia", "Alicante", "Castellón de la Plana"]
    };
    const formStatus = document.getElementById("form-status");
    const presetButtons = document.querySelectorAll(".preset-btn");

    if (
        !purchasePrice ||
        !region ||
        !zone ||
        !deposit ||
        !mortgageYears ||
        !interestRate ||
        !propertyTypes.length
    ) {
        return;
    }

    if (region.dataset.initialized === "true") {
        return;
    }

    region.innerHTML = "";
    REGIONS.forEach(({ id, name }) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = name;
        region.appendChild(option);
    });
    region.dataset.initialized = "true";

    function populateZones(selectedRegion) {
        const options = zoneOptions[selectedRegion] || zoneOptions.andalusia;
        const currentValue = zone.value || options[0];
        zone.innerHTML = "";
        options.forEach((optionName) => {
            const option = document.createElement("option");
            option.value = optionName;
            option.textContent = optionName;
            if (optionName === currentValue) {
                option.selected = true;
            }
            zone.appendChild(option);
        });
        if (!zone.value) {
            zone.value = options[0];
        }
    }

    region.addEventListener("change", () => populateZones(region.value));
    populateZones(region.value || "andalusia");

    function saveCalculator() {

        const data = {
            purchasePrice: purchasePrice.value,
            region: region.value,
            zone: zone.value,
            propertyType: document.querySelector("input[name='property-type']:checked")?.value,
            buyerStatus: document.querySelector("input[name='buyer-status']:checked")?.value,
            financing: document.querySelector("input[name='financing']:checked")?.value,
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
            zone.value = data.zone ?? "Chiclana";
            deposit.value = data.depositPercent ?? DEFAULTS.depositPercent;
            mortgageYears.value = data.mortgageYears ?? DEFAULTS.mortgageYears;
            interestRate.value = data.interestRate ?? DEFAULTS.interestRate;

            propertyTypes.forEach((radio) => {
                radio.checked = radio.value === data.propertyType;
            });
            buyerStatuses.forEach((radio) => {
                radio.checked = radio.value === data.buyerStatus;
            });
            financingOptions.forEach((radio) => {
                radio.checked = radio.value === data.financing;
            });

        } catch (error) {

            console.error(error);

        }

    }

    function updateZoneLabel() {
        const selectedZone = zone?.value || "Chiclana";
        if (zoneLabel) {
            zoneLabel.textContent = `Gesamte Nebenkosten in ${selectedZone}`;
        }

        const zoneNote = document.getElementById("zone-note");
        if (zoneNote) {
            zoneNote.textContent = selectedZone;
        }

        if (percentageNote) {
            const purchasePriceValue = Number(purchasePrice.value || 0);
            const totalCosts = Number(document.getElementById("zone-total-result")?.textContent.replace(/[^0-9,.-]/g, "").replace(".", "").replace(",", ".") || 0);
            const percent = purchasePriceValue > 0 ? (totalCosts / purchasePriceValue) * 100 : 0;
            percentageNote.textContent = `ca. ${percent.toFixed(1).replace(".", ",")} % des Kaufpreises`;
        }
    }

    function handleConsultationSubmit(event) {
        event.preventDefault();

        if (!consultationForm) return;

        const formData = new FormData(consultationForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const region = String(formData.get("region") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            if (formStatus) {
                formStatus.textContent = "Bitte füllen Sie Name, E-Mail und Nachricht aus.";
            }
            return;
        }

        const body = [
            `Name: ${name}`,
            `E-Mail: ${email}`,
            phone ? `Telefon: ${phone}` : null,
            region ? `Region: ${region}` : null,
            "",
            message
        ].filter(Boolean).join("\n");

        const whatsappNumber = consultationForm.getAttribute("data-whatsapp-number") || "";
        const subject = encodeURIComponent("Immobilienberatung Anfrage");
        const encodedBody = encodeURIComponent(body);

        if (whatsappNumber) {
            const cleanNumber = whatsappNumber.replace(/\D/g, "");
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedBody}`;
            const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            if (popup) {
                if (formStatus) {
                    formStatus.textContent = "Ihre Anfrage wird in WhatsApp geöffnet.";
                }
            } else {
                window.location.href = whatsappUrl;
            }
        } else {
            const mailtoUrl = `mailto:beratung@andaluciahub.com?subject=${subject}&body=${encodedBody}`;
            window.location.href = mailtoUrl;
        }

        consultationForm.reset();
    }

    function updateCalculator() {

        const selectedPropertyType =
            document.querySelector("input[name='property-type']:checked")?.value;

        const data = {
            purchasePrice: Number(purchasePrice.value || 0),
            region: region.value,
            zone: zone.value,
            propertyType: selectedPropertyType,
            buyerStatus: document.querySelector("input[name='buyer-status']:checked")?.value,
            financing: document.querySelector("input[name='financing']:checked")?.value,
            depositPercent: Number(deposit.value || 0),
            mortgageYears: Number(mortgageYears.value || 0),
            interestRate: Number(interestRate.value || 0)
        };

        const validation = validate(data);

        if (!validation.valid) return;

        try {

            const result = calculate(data);

            renderResults(result);
            updateZoneLabel();

            saveCalculator();

        } catch (error) {

            console.error(error);

        }

    }

    function resetCalculator() {

        purchasePrice.value = "";
        region.value = DEFAULTS.region;
        zone.value = "Chiclana";
        deposit.value = DEFAULTS.depositPercent;
        mortgageYears.value = DEFAULTS.mortgageYears;
        interestRate.value = DEFAULTS.interestRate;

        propertyTypes.forEach((radio) => {
            radio.checked = radio.value === DEFAULTS.propertyType;
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

    buyerStatuses.forEach((radio) => {
        radio.addEventListener("change", debouncedUpdate);
    });

    financingOptions.forEach((radio) => {
        radio.addEventListener("change", debouncedUpdate);
    });

    [zone].forEach((element) => {
        element.addEventListener("input", debouncedUpdate);
        element.addEventListener("change", debouncedUpdate);
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

    if (consultationForm && !consultationForm.dataset.bound) {
        consultationForm.dataset.bound = "true";
        consultationForm.addEventListener("submit", handleConsultationSubmit);
    }

    loadCalculator();
    updateZoneLabel();
    updateCalculator();

}