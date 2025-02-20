export default function UseCalcPrice(price, currentCurrency) {
  if (!currentCurrency?.convertRate) return null;
  return (
    Math.ceil(price * currentCurrency.convertRate).toLocaleString('en-US') +
    ' ' +
    currentCurrency.currency
  );
}
