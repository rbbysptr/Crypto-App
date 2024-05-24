export function formatUSD(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}
export function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
}
export function formatPercent(number) {
    return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}
export function formatCrypto(value, symbol) {
    return `${symbol} ${new Intl.NumberFormat("en-US").format(value)}`;
}