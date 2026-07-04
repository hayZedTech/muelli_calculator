import { TAX_RATES } from "../config/taxes.js";

export function calculateTaxes(
    purchasePrice,
    region,
    propertyType
) {

    const amount = Number(purchasePrice);

    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error("Invalid purchase price.");
    }

    const regionData = TAX_RATES[region];

    if (!regionData) {
        throw new Error(`Unknown region: ${region}`);
    }

    const propertyData = regionData[propertyType];

    if (!propertyData) {
        throw new Error(`Unknown property type: ${propertyType}`);
    }

    return {

        itp: amount * (propertyData.taxes.itp || 0),

        vat: amount * (propertyData.taxes.vat || 0),

        ajd: amount * (propertyData.taxes.ajd || 0)

    };

}