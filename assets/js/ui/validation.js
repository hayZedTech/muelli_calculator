export function validate(data) {

    const errors = [];

    // Allow empty purchase price so reset works.
    // Only reject negative values.
    if (
        !Number.isFinite(data.purchasePrice) ||
        data.purchasePrice < 0
    ) {
        errors.push("Purchase price cannot be negative.");
    }

    if (
        !Number.isFinite(data.depositPercent) ||
        data.depositPercent < 0 ||
        data.depositPercent > 100
    ) {
        errors.push("Deposit must be between 0 and 100.");
    }

    if (
        !Number.isFinite(data.interestRate) ||
        data.interestRate < 0
    ) {
        errors.push("Interest rate cannot be negative.");
    }

    if (
        !Number.isFinite(data.mortgageYears) ||
        data.mortgageYears <= 0
    ) {
        errors.push("Mortgage term must be greater than zero.");
    }

    if (!data.region) {
        errors.push("Region is required.");
    }

    if (!data.propertyType) {
        errors.push("Property type is required.");
    }

    return {
        valid: errors.length === 0,
        errors
    };

}