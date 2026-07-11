import { calculateTaxes } from "./taxes.js";
import { calculateFees } from "./fees.js";

export function calculate(data) {
    const purchasePrice = Number(data.purchasePrice || 0);
    const buyerStatus = data.buyerStatus || "resident";
    const propertyType = data.propertyType || "resale";
    const financing = data.financing || "equity";

    if (purchasePrice <= 0) {
        return {
            purchasePrice: 0,
            taxes: { itp: 0, vat: 0, ajd: 0 },
            fees: { notaryRegistry: 0, legal: 0 },
            nieSetup: 0,
            mortgageCosts: 0,
            totalCosts: 0,
            totalCostsPercent: 0,
            grandTotal: 0,
            buyerStatus,
            propertyType,
            financing
        };
    }

    // Calculate taxes (ITP for resale, VAT+AJD for new)
    const taxes = calculateTaxes(purchasePrice, "andalusia", propertyType);

    // Calculate fees
    const fees = calculateFees(purchasePrice);

    // NIE setup (only for non-residents)
    const nieSetup = buyerStatus === "non-resident" ? 600 : 0;

    // Mortgage costs (1.5% of 70% of purchase price if mortgage financing)
    const mortgageCosts = financing === "mortgage" ? purchasePrice * 0.70 * 0.015 : 0;

    // Total costs
    const totalCosts = taxes.itp + taxes.vat + taxes.ajd + fees.notaryRegistry + fees.legal + nieSetup + mortgageCosts;
    const totalCostsPercent = ((totalCosts / purchasePrice) * 100).toFixed(1);

    // Grand total (purchase price + all costs)
    const grandTotal = purchasePrice + totalCosts;

    return {
        purchasePrice,
        taxes,
        fees,
        nieSetup,
        mortgageCosts,
        totalCosts,
        totalCostsPercent,
        grandTotal,
        buyerStatus,
        propertyType,
        financing
    };
}
