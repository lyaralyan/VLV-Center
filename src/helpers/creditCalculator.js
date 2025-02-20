import {t} from 'i18next';
import UseCalcPrice from './UseCalcPrice';

const credit36Month = (price, monthText = true, currentCurrency) => {
  if (price && price > 26000) {
    return (
      UseCalcPrice(
        Math.round((price / 36 + (price * 1.01) / 100) / 100) * 100,
        currentCurrency,
      ) + (monthText ? ' / ' + t('month') : '')
    );
  }
  return null;
};
const credit24Month = (price, monthText = true, currentCurrency) => {
  if (price && price > 26000) {
    return (
      UseCalcPrice(
        Math.round((price / 24 + (price * 1.01) / 100) / 100) * 100,
        currentCurrency,
      ) + (monthText ? ' / ' + t('month') : '')
    );
  }
  return null;
};
const credit12Month = (price, monthText = true, currentCurrency) => {
  if (price && price > 26000) {
    return (
      UseCalcPrice(
        Math.round((price / 12 + (price * 1.01) / 100) / 100) * 100,
        currentCurrency,
      ) + (monthText ? ' / ' + t('month') : '')
    );
  }
  return null;
};
export {credit36Month, credit24Month, credit12Month};
