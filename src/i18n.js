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
          form: {
            signup: {
              usernameTitle: 'Username',
              longUsername: 'Username must be less than 10 characters',
              shortUsername: 'Username must be at least 3 characters',
              confirmPassword: 'Confirm Password',
              matchingPassword: 'Passwords must match',
              firstName: 'First Name',
              lastName: 'Last Name',
              confirmPassword: 'Confirm Password',
              google: 'Register with Google'
            },
            emailTitle: 'Email',
            invalidEmail: 'Invalid Email Address',
            longEmail: 'Email must be at most 25 characters',
            longPassword: 'Password must be at least 8 characters',
            passwordTitle: 'Password', 
            required: 'Required',
            hide: 'Hide',
            show: 'Show',
          },
          header: {
            signin: 'Sign In',
            register: 'Register',
            logout: 'Log Out'
          },
          footer: {
            privacy: 'Privacy Notice',
            terms: 'Terms of Use',
            dimesInc: 'Dimes Inc.'
          }
        }
      },
      jp: {
        // all of the below still need official translations
        translation: {
          form: {
            signup: {
              usernameTitle: 'ユーザー名',
              longUsername: 'ユーザー名は10文字未満である必要があります',
              shortUsername: 'ユーザー名は3文字以上である必要があります',
              confirmPassword: 'パスワードを認証する',
              matchingPassword: 'パスワードが一致する必要があります',
              firstName: 'ファーストネーム',
              lastName: '苗字',
              confirmPassword: 'パスワードを認証する',
              google: 'Googleに登録する',
            },
            emailTitle: 'Eメール',
            invalidEmail: '無効な電子メールアドレス',
            longEmail: '電子メールは最大 25 文字にする必要があります',
            longPassword: 'パスワードは8文字以上でなければなりません',
            passwordTitle: 'パスワード', 
            required: '必須',
            hide: '隠す',
            show: '公演',
          },
          header: {
            signin: 'サインイン',
            register: '登録',
            logout: 'ログアウト'
          },
          footer: {
            privacy: 'プライバシー通知',
            terms: '利用規約',
            dimesInc: '株式会社ダイムズ'
          }
        }
      },
      cn: {
        // will need CN translations, can copy paste the above here with correct CN translations
      }
    }
  });

export default i18n;
