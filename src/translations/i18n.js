import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HY from './hy.json';
import RU from './ru.json';
import EN from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    hy: {translation: HY},
    ru: {translation: RU},
    en: {translation: EN},
  },
  lang: 'hy',
  fallbackLng: 'hy',
  compatibilityJSON: 'v3', // By default React Native projects does not support Intl
});

export default i18n;
