import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          description: {
            emailTitle: 'Email',
            invalidEmail: 'Invalid Email Address',
            longEmail: 'Email must be at most 25 characters',
            longPassword: 'Password must be at least 8 characters',
            passwordTitle: 'Password', 
            required: 'Required',
            hide: 'Hide',
            show: 'Show',
            signin: 'Sign In',
            register: 'Register',
            privacy: 'Privacy Notice',
            terms: 'Terms of Use',
            dimesInc: 'Dimes Inc.'
          },
        }
      },
      jp: {
        translation: {
          description: {
            emailTitle: 'Eメール', // needs official translation
            invalidEmail: '無効な電子メールアドレス', // needs official transation
            longEmail: '電子メールは最大 25 文字にする必要があります',
            longPassword: 'パスワードは8文字以上でなければなりません',
            passwordTitle: 'パスワード', // needs official transation
            required: '必須', // needs official transation
            hide: '隠す', // needs official transation
            show: '公演', // needs official transation
            signin: 'サインイン', // needs official transation
            register: '登録', // needs official transation
            privacy: 'プライバシー通知', // needs official translation
            terms: '利用規約', // needs official translation
            dimesInc: '株式会社ダイムズ', // needs official translation
          }
        }
      },
      cn: {
        translation: {
          description: {
            emailTitle: 'chineseText1', // needs official translation
            invalidEmail: 'chineseText2', // needs official transation
            longEmail: 'chineseText3', // needs official transation
            longPassword: 'chineseText4', // needs official transation
            passwordTitle: 'chineseText5', // needs official transation
            required: 'chineseText6', // needs official transation
            hide: 'chineseText7', // needs official transation
            show: 'chineseText8', // needs official transation
            signin: 'chineseText9', // needs official transation
            register: 'chineseText10', // needs official transation
            privacy: 'chineseText11', // needs official translation
            terms: 'chineseText12', // needs official translation
            dimesInc: 'chineseText13', // needs official translation
          }
        }
      }
    }
  });

export default i18n;
