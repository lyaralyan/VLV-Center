import ArmFlagSvg from './assets/ArmFlagSvg';
import RuFlagSvg from './assets/RuFlagSvg';
import UsaFlagSvg from './assets/UsaFlagSvg';

export const languagesData = [
  {
    label: 'Հայերեն',
    value: 'hy',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Русский',
    value: 'ru',
  },
];
export const currencyData = [
  {
    label: '(֏) Դրամ',
    value: 'amd',
    currency: '֏',
    convertRate: 1,
    id: 121,
  },
  {
    label: '($) Dollars',
    value: 'usd',
    currency: '$',
    convertRate: null,
    id: 2,
  },
  {
    label: '(руб) Рубли',
    value: 'rub',
    currency: 'руб',
    convertRate: null,
    id: 87,
  },
];
export const languageFlags = {
  hy: <ArmFlagSvg />,
  en: <UsaFlagSvg />,
  ru: <RuFlagSvg />,
};
