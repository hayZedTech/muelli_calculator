export function validate(data) {
    const errors = [];

    if (!Number.isFinite(data.purchasePrice) || data.purchasePrice < 0) {
        errors.push("Purchase price cannot be negative.");
    }

    if (!data.propertyType) {
        errors.push("Property type is required.");
    }

    if (!data.buyerStatus) {
        errors.push("Buyer status is required.");
    }

    if (!data.financing) {
        errors.push("Financing option is required.");
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
