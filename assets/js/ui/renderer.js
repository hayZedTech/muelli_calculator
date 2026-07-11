import { formatCurrency } from "../core/formatter.js";

export function renderResults(result) {
    const elements = {
        "itp-result": result.taxes.itp,
        "vat-result": result.taxes.vat,
        "ajd-result": result.taxes.ajd,
        "notary-registry-result": result.fees.notaryRegistry,
        "legal-result": result.fees.legal,
        "nie-result": result.nieSetup,
        "mortgage-costs-result": result.mortgageCosts,
        "total-costs-result": result.totalCosts,
        "grand-total-result": result.grandTotal
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = formatCurrency(value);
        }
    });

    // Show ITP for resale, VAT+AJD for new
    const itpRow = document.getElementById("itp-row");
    const vatRow = document.getElementById("vat-row");
    const ajdRow = document.getElementById("ajd-row");
    
    if (result.propertyType === "resale") {
        if (itpRow) itpRow.style.display = "flex";
        if (vatRow) vatRow.style.display = "none";
        if (ajdRow) ajdRow.style.display = "none";
    } else {
        if (itpRow) itpRow.style.display = "none";
        if (vatRow) vatRow.style.display = "flex";
        if (ajdRow) ajdRow.style.display = "flex";
    }

    // Show/hide NIE setup row based on buyer status
    const nieRow = document.getElementById("nie-row");
    if (nieRow) {
        nieRow.style.display = result.buyerStatus === "non-resident" ? "flex" : "none";
    }

    // Show/hide mortgage costs row based on financing
    const mortgageRow = document.getElementById("mortgage-row");
    if (mortgageRow) {
        mortgageRow.style.display = result.financing === "mortgage" ? "flex" : "none";
    }

    // Update percentage
    const percentElement = document.getElementById("total-costs-percent");
    if (percentElement) {
        percentElement.textContent = `ca. ${result.totalCostsPercent}% des Kaufpreises`;
    }
}
