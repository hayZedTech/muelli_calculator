import { formatCurrency } from "../core/formatter.js";

export function renderResults(result) {

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