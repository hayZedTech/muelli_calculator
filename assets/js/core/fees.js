import { FEES } from "../config/fees.js";

function estimate(price, config) {
    const amount = Number(price);

    if (!Number.isFinite(amount) || amount <= 0) {
        return 0;
    }

    const fee = amount * config.percentage;
    return Math.max(fee, config.minimum);
}

export function calculateFees(price) {
    const legal = estimate(price, FEES.legal);
    const notaryRegistry = estimate(price, FEES.notaryRegistry);

    // Add 21% IVA to legal fees
    const legalWithIVA = legal * 1.21;

    return {
        legal: legalWithIVA,
        notaryRegistry: notaryRegistry
    };
}
