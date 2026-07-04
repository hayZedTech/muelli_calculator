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

    return {

        legal: estimate(price, FEES.legal),

        notary: estimate(price, FEES.notary),

        registry: estimate(price, FEES.registry)

    };

}