export function calculateMortgage(
    loanAmount,
    annualInterestRate,
    years
) {

    const principal = Number(loanAmount);
    const interest = Number(annualInterestRate);
    const term = Number(years);

    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(interest) ||
        !Number.isFinite(term) ||
        principal <= 0 ||
        term <= 0
    ) {
        return 0;
    }

    if (interest === 0) {
        return principal / (term * 12);
    }

    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = term * 12;

    const factor = Math.pow(
        1 + monthlyRate,
        numberOfPayments
    );

    const monthlyPayment =
        (
            principal *
            monthlyRate *
            factor
        ) /
        (
            factor - 1
        );

    return monthlyPayment;

}