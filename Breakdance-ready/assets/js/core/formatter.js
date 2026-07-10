export function formatCurrency(value) {

    const amount = Number(value);

    if (isNaN(amount)) {
        return "€0.00";
    }

    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);

}