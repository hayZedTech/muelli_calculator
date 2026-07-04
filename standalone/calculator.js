// ===== TAX RATES BY REGION =====
const TAX_RATES = {
    andalusia: { resale: { itp: 0.07, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.012 } },
    aragon: { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    asturias: { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.012 } },
    "balearic-islands": { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    "basque-country": { resale: { itp: 0.04, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0 } },
    "canary-islands": { resale: { itp: 0.065, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.07, ajd: 0.012 } },
    cantabria: { resale: { itp: 0.09, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    "castile-la-mancha": { resale: { itp: 0.09, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    "castile-and-leon": { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    catalonia: { resale: { itp: 0.10, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    ceuta: { resale: { itp: 0.06, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.005 } },
    extremadura: { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    galicia: { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    "la-rioja": { resale: { itp: 0.07, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.01 } },
    madrid: { resale: { itp: 0.06, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.006 } },
    melilla: { resale: { itp: 0.06, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.005 } },
    murcia: { resale: { itp: 0.08, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } },
    navarre: { resale: { itp: 0.06, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.005 } },
    "valencian-community": { resale: { itp: 0.10, vat: 0, ajd: 0 }, new: { itp: 0, vat: 0.10, ajd: 0.015 } }
};

// ===== REGIONS LIST =====
const REGIONS = [
    { id: "andalusia", name: "Andalusien" },
    { id: "aragon", name: "Aragón" },
    { id: "asturias", name: "Asturien" },
    { id: "balearic-islands", name: "Balearen" },
    { id: "basque-country", name: "Baskenland" },
    { id: "canary-islands", name: "Kanarische Inseln" },
    { id: "cantabria", name: "Kantabrien" },
    { id: "castile-la-mancha", name: "Kastilien-La Mancha" },
    { id: "castile-and-leon", name: "Kastilien und León" },
    { id: "catalonia", name: "Katalonien" },
    { id: "ceuta", name: "Ceuta" },
    { id: "extremadura", name: "Extremadura" },
    { id: "galicia", name: "Galicien" },
    { id: "la-rioja", name: "La Rioja" },
    { id: "madrid", name: "Madrid" },
    { id: "melilla", name: "Melilla" },
    { id: "murcia", name: "Murcia" },
    { id: "navarre", name: "Navarra" },
    { id: "valencian-community", name: "Valencia" }
];

// ===== FEES CONFIGURATION =====
const FEES = {
    legal: { percentage: 0.01, minimum: 1200 },
    notary: { percentage: 0.005, minimum: 600 },
    registry: { percentage: 0.003, minimum: 400 }
};

// ===== STORAGE KEY =====
const STORAGE_KEY = "muelli-calculator";

// ===== FORMAT CURRENCY =====
function formatCurrency(value) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// ===== CALCULATE TAXES =====
function calculateTaxes(purchasePrice, region, propertyType) {
    const amount = Number(purchasePrice);
    if (!isFinite(amount) || amount < 0) return { itp: 0, vat: 0, ajd: 0 };

    const regionData = TAX_RATES[region];
    if (!regionData) return { itp: 0, vat: 0, ajd: 0 };

    const propertyData = regionData[propertyType];
    if (!propertyData) return { itp: 0, vat: 0, ajd: 0 };

    return {
        itp: amount * (propertyData.itp || 0),
        vat: amount * (propertyData.vat || 0),
        ajd: amount * (propertyData.ajd || 0)
    };
}

// ===== CALCULATE FEES =====
function calculateFees(price) {
    const amount = Number(price);
    if (!isFinite(amount) || amount <= 0) return { legal: 0, notary: 0, registry: 0 };

    return {
        legal: Math.max(amount * FEES.legal.percentage, FEES.legal.minimum),
        notary: Math.max(amount * FEES.notary.percentage, FEES.notary.minimum),
        registry: Math.max(amount * FEES.registry.percentage, FEES.registry.minimum)
    };
}

// ===== CALCULATE MORTGAGE =====
function calculateMortgage(loanAmount, annualInterestRate, years) {
    const principal = Number(loanAmount);
    const interest = Number(annualInterestRate);
    const term = Number(years);

    if (!isFinite(principal) || !isFinite(interest) || !isFinite(term) || principal <= 0 || term <= 0) {
        return 0;
    }

    if (interest === 0) {
        return principal / (term * 12);
    }

    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = term * 12;
    const factor = Math.pow(1 + monthlyRate, numberOfPayments);

    return (principal * monthlyRate * factor) / (factor - 1);
}

// ===== MAIN CALCULATION =====
function calculate(data) {
    const purchasePrice = Number(data.purchasePrice || 0);
    const depositPercent = Number(data.depositPercent);
    const interestRate = Number(data.interestRate);
    const mortgageYears = Number(data.mortgageYears);

    if (purchasePrice <= 0) {
        return {
            purchasePrice: 0,
            depositPercent,
            depositAmount: 0,
            loanAmount: 0,
            interestRate,
            mortgageYears,
            monthlyMortgage: 0,
            taxes: { itp: 0, vat: 0, ajd: 0 },
            fees: { notary: 0, registry: 0, legal: 0 },
            totalTaxes: 0,
            totalFees: 0,
            purchaseCosts: 0,
            cashRequired: 0,
            grandTotal: 0
        };
    }

    const depositAmount = purchasePrice * (depositPercent / 100);
    const loanAmount = purchasePrice - depositAmount;
    const taxes = calculateTaxes(purchasePrice, data.region, data.propertyType);
    const fees = calculateFees(purchasePrice);
    const monthlyMortgage = calculateMortgage(loanAmount, interestRate, mortgageYears);

    const totalTaxes = taxes.itp + taxes.vat + taxes.ajd;
    const totalFees = fees.notary + fees.registry + fees.legal;
    const purchaseCosts = totalTaxes + totalFees;
    const cashRequired = depositAmount + purchaseCosts;
    const grandTotal = purchasePrice + purchaseCosts;

    return {
        purchasePrice,
        depositPercent,
        depositAmount,
        loanAmount,
        interestRate,
        mortgageYears,
        monthlyMortgage,
        taxes,
        fees,
        totalTaxes,
        totalFees,
        purchaseCosts,
        cashRequired,
        grandTotal
    };
}

// ===== RENDER RESULTS =====
function renderResults(result) {
    const elements = {
        "itp-result": result.taxes.itp,
        "vat-result": result.taxes.vat,
        "ajd-result": result.taxes.ajd,
        "notary-result": result.fees.notary,
        "registry-result": result.fees.registry,
        "legal-result": result.fees.legal,
        "loan-result": result.loanAmount,
        "mortgage-result": result.monthlyMortgage,
        "purchase-price-result": result.purchasePrice,
        "purchase-cost-result": result.purchaseCosts,
        "cash-required-result": result.cashRequired,
        "grand-total-result": result.grandTotal
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = formatCurrency(value);
        }
    });
}

// ===== POPULATE REGIONS =====
function populateRegions() {
    const regionSelect = document.getElementById("region");
    if (!regionSelect) return;

    REGIONS.forEach(region => {
        const option = document.createElement("option");
        option.value = region.id;
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });
}

// ===== SAVE CALCULATOR STATE =====
function saveCalculator() {
    const purchasePrice = document.getElementById("purchase-price");
    const region = document.getElementById("region");
    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");
    const propertyType = document.querySelector("input[name='property-type']:checked");

    const data = {
        purchasePrice: purchasePrice.value,
        region: region.value,
        propertyType: propertyType.value,
        depositPercent: deposit.value,
        mortgageYears: mortgageYears.value,
        interestRate: interestRate.value
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===== LOAD CALCULATOR STATE =====
function loadCalculator() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        document.getElementById("purchase-price").value = data.purchasePrice || "";
        document.getElementById("region").value = data.region || "andalusia";
        document.getElementById("deposit").value = data.depositPercent || "20";
        document.getElementById("mortgage-years").value = data.mortgageYears || "25";
        document.getElementById("interest-rate").value = data.interestRate || "3.5";

        const propertyType = data.propertyType || "resale";
        document.getElementById("property-resale").checked = propertyType === "resale";
        document.getElementById("property-new").checked = propertyType === "new";
    } catch (error) {
        console.error("Error loading calculator state:", error);
    }
}

// ===== UPDATE CALCULATOR =====
function updateCalculator() {
    const purchasePrice = document.getElementById("purchase-price");
    const region = document.getElementById("region");
    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");
    const propertyType = document.querySelector("input[name='property-type']:checked");

    const data = {
        purchasePrice: Number(purchasePrice.value || 0),
        region: region.value,
        propertyType: propertyType.value,
        depositPercent: Number(deposit.value || 0),
        mortgageYears: Number(mortgageYears.value || 0),
        interestRate: Number(interestRate.value || 0)
    };

    try {
        const result = calculate(data);
        renderResults(result);
        saveCalculator();
    } catch (error) {
        console.error("Error calculating:", error);
    }
}

// ===== RESET CALCULATOR =====
function resetCalculator() {
    document.getElementById("purchase-price").value = "";
    document.getElementById("region").value = "andalusia";
    document.getElementById("deposit").value = "20";
    document.getElementById("mortgage-years").value = "25";
    document.getElementById("interest-rate").value = "3.5";
    document.getElementById("property-resale").checked = true;
    document.getElementById("property-new").checked = false;

    localStorage.removeItem(STORAGE_KEY);
    updateCalculator();
}

// ===== EXPORT PDF =====
function exportPDF() {
    window.print();
}

// ===== DEBOUNCE FUNCTION =====
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", function () {
    populateRegions();
    loadCalculator();

    const purchasePrice = document.getElementById("purchase-price");
    const region = document.getElementById("region");
    const deposit = document.getElementById("deposit");
    const mortgageYears = document.getElementById("mortgage-years");
    const interestRate = document.getElementById("interest-rate");
    const propertyTypes = document.querySelectorAll("input[name='property-type']");
    const resetButton = document.getElementById("reset-calculator");
    const exportButton = document.getElementById("export-pdf");

    const debouncedUpdate = debounce(updateCalculator, 250);

    [purchasePrice, region, deposit, mortgageYears, interestRate].forEach(element => {
        element.addEventListener("input", debouncedUpdate);
        element.addEventListener("change", debouncedUpdate);
    });

    propertyTypes.forEach(radio => {
        radio.addEventListener("change", debouncedUpdate);
    });

    resetButton.addEventListener("click", resetCalculator);
    exportButton.addEventListener("click", exportPDF);

    updateCalculator();
});
