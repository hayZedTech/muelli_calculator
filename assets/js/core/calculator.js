import { calculateTaxes } from "./taxes.js";
import { calculateFees } from "./fees.js";
import { calculateMortgage } from "./mortgage.js";

export function calculate(data) {

    const purchasePrice = Number(data.purchasePrice || 0);
    const depositPercent = Number(data.depositPercent);
    const interestRate = Number(data.interestRate);
    const mortgageYears = Number(data.mortgageYears);

    // Reset state
    if (purchasePrice <= 0) {

        return {

            purchasePrice: 0,

            depositPercent,

            depositAmount: 0,

            loanAmount: 0,

            interestRate,

            mortgageYears,

            monthlyMortgage: 0,

            taxes: {
                itp: 0,
                vat: 0,
                ajd: 0
            },

            fees: {
                notary: 0,
                registry: 0,
                legal: 0
            },

            totalTaxes: 0,

            totalFees: 0,

            purchaseCosts: 0,

            cashRequired: 0,

            grandTotal: 0

        };

    }

    const depositAmount =
        purchasePrice * (depositPercent / 100);

    const loanAmount =
        purchasePrice - depositAmount;

    const taxes = calculateTaxes(
        purchasePrice,
        data.region,
        data.propertyType
    );

    const fees = calculateFees(purchasePrice);

    const monthlyMortgage = calculateMortgage(
        loanAmount,
        interestRate,
        mortgageYears
    );

    const totalTaxes =
        taxes.itp +
        taxes.vat +
        taxes.ajd;

    const totalFees =
        fees.notary +
        fees.registry +
        fees.legal;

    const purchaseCosts =
        totalTaxes +
        totalFees;

    const cashRequired =
        depositAmount +
        purchaseCosts;

    const grandTotal =
        purchasePrice +
        purchaseCosts;

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