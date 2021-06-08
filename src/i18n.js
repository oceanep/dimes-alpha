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
          landing: {
            tagline: 'Relationships should, would, could be easy with Dimes',
            description: 'Dimes utilises AI cloud technology to create the right place at the right time',
            beta: 'To sign up as a Beta user, click below.',
            button: 'Sign Up for More Information',
            routine: 'Set up routine schedule',
            schedule: 'Tuesday evenings no good? Sunday mornings an absolute no-go? Always free on Wednesdays? Set your Routine Schedule.',
            import_existing: 'Import Existing Commitments',
            google: 'Automatically import any existing commitments you have from your favorite calendar software.',
            connect_contacts: 'Connect with your Contacts',
            share_connect: 'Share Connect Link to your contacts to connect and get planning',
            create_plan: 'Create a plan',
            sit_back: 'Sit back and let Dimes find the best timing for you and all parties',
            perfect_timing: 'Find the perfect timing for your important relationships',
            let_dimes: 'Let Dimes help you look after your important relationships',
            meeting_people: 'Meeting people, at the right place at the right time.',
            ceo: 'Founder & CEO　Eric Wei',
          },
          registration: {
            create_an_account: 'Create a Dimes account',
            already_have_an_account: 'Already have an account? Sign In',
            terms_and_conditions: 'By signing up, you agree to the Terms of Use and Privacy Notice',
          },
          signin: {
            sign_in: 'Sign In',
            do_not_have_account: 'Don\'t have an account yet? Register',
            forgot_password: 'Forgot your password?',
            remember_me: 'Remember Me',
          },
          main_page: {
            my_availability: 'My Availability',
            welcome: 'Welcome',
            contact_invite: 'Contact Invite Link',
            hourly_view: 'Hourly View',
            daytime_view: 'Daytime View',
            clear_calendar: 'Clear Calendar',
            make_a_plan: 'Make a plan',
            MON: 'MON',
            TUE: 'TUE',
            WED: 'WED',
            THU: 'THU',
            FRI: 'FRI',
            SAT: 'SAT',
            SUN: 'SUN',
            sync_with_google: 'Sync with Google Calendar',
            contacts: 'My Contacts',
            plans_user_initiated: 'Plans I\'ve initiated',
            plans_user_invite: 'Plans I\'ve been invited to',
          },
          button : {
            full_view: 'Full View',
            select: 'Select',
            find_timing: 'Find Timing',
            suggest_timing: 'Suggest this timing',
          },
          book_page: {
            right_timing: 'Find the right timing',
            time_slots_that_work: 'Find time slots that work for you and your parties',
            date_from: 'Date From',
            date_to: 'Date To',
            duration: 'Duration',
            back: 'Back',
          },
          meeting_dates_page: {
            category: 'Category',
            all_categories: 'All Categories',
            weekday_morning: 'Weekday Morning',
            weekday_afternoon: 'Weekday Afternoon',
            weekday_lunch: 'Weekday Lunch',
            weekday_evening: 'Weekday Evening',
            weekend_morning: 'Weekend Morning',
            weekend_afternoon: 'Weekend Afternoon',
            weekend_lunch: 'Weekend Lunch',
            weekend_evening: 'Weekend Evening',
            select_this_date: 'Select this date and send an invite',
            deets: 'Deets',
            add_deets: 'Add deets and send an invite',
            title: 'Title',
            about: 'About',
          },
          confirmed_meeting_view: {
            date: 'Date',
            time: 'Time',
            coming: 'Coming',
            RSVP_status: 'RSVP Status',
            RSVP: 'RSVP',
            going: 'Going',
            not_going: 'Not Going',
            do_not_know: 'Don\'t know yet',
            about: 'About',
          },
          my_account: {
            intro: 'Here you can update your profile photo, language, notification and your schedule setttings.'
          },
          side_menu: {
            my_page: 'My Page',
            availability: 'My Availability',
            my_contacts: 'My Contacts',
            plans_initiated: 'Plans I\'ve initiated',
            plans_invited: 'Plans I\'ve been intvited to',
            notifications: 'Notifications',
            sign_out: 'Sign Out',
          },
          my_availability: {
            availability: 'If you are routinely busy or free at certain hour every day or week (like work hours) , you can enter recurring slots in one go. You can also import Google calendar to avoid conflict with your existing plans.',
          },
          my_contacts_page: {
            contacts: 'Invite and connect with your dearest, nearest and afar. With each connection, make a wish, how much time you want to spend with that person and how often, we make it happen. Oh and Dimes is pretty good at memory keeping too.' 
          },
          plans_initiated_page: {
            plans: 'Here you can \'Create a Plan\' to find timing for you and your contacts, and check up on the plans that you initiated, and to ensure you copy them to your master calendar so you wouldn\'t miss it.'
          },
          plans_invited_page: {
            plans: 'Here you can check up the plans that you\'ve been invited to. Make sure to RSVP and copy them to your master calendar.'
          },
          recent_activity_page: {
            activity: 'Here you can find who have accepted your friend invite, send invites and other useful things that you need to know.'
          },
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
            dimesInc: '© 2021 Dimes, Inc.'
          }
        }
      },
      jp: {
        translation: {
          landing: {
            tagline: '大切な人とのタイミング見つけます',
            description: 'スマートな AI クラウド技術で Dimes が日程調整を代行',
            beta: '以下のリンクよりベータ版にアクセス',
            button: 'Dimes を使いこなそう',
            routine: '時間をブロック',
            schedule: 'あらかじめ時間をブロックすることも可能です',
            import_existing: '既存の予定をインポートする',
            google: 'Googleカレンダーユーザなら既存の予定をインポート可能。ダブルブッキングの心配もありません。',
            connect_contacts: 'お友達と繋がる',
            share_connect: 'お友達にリンクをシェアして繋がりましょう',
            create_plan: '予定を作成',
            sit_back: 'あとは Dimes におまかせください！みんなのタイミングにぴったりの予定日や時刻を提案いたします。',
            perfect_timing: '大切な友達とのタイミング見つけましょう',
            meeting_people: '会いたい時に会えるように。',
            let_dimes: 'Dimes はあなたにとっての大切な繋がりを大切にします。敬遠になる前に大切な人とのタイミングを見つけだします。',
            ceo: '創設者兼 CEO　エリック・ウェイ',
          },
          registration: {
            create_an_account: 'Dimes のアカウントを作成する',
            already_have_an_account: '既に Dimes のアカウントをお持ちですか？　サインイン',
            terms_and_conditions: '続行することで、Dimes の利用規約およびプライバシー規約に同意するものとみなされます。',
          },
          signin: {
            sign_in: 'サインイン',
            do_not_have_account: 'Dimes は初めてですか？今すぐ登録',
            forgot_password: 'パスワードを忘れた方',
            remember_me: 'サインインしたままにする',
          },
          main_page: {
            my_availability: 'マイルーティンスケジュールc',
            welcome: 'こんにちは',
            contact_invite: '友達招待リンク',
            hourly_view: '１時間ビュー',
            daytime_view: '9時から23時',
            clear_calendar: 'リセット',
            make_a_plan: '予定を作成',
            MON: '月',
            TUE: '火',
            WED: '水',
            THU: '木',
            FRI: '金',
            SAT: '土',
            SUN: '日',
            sync_with_google: 'Google カレンダーと連携',
            contacts: 'お友達リスト',
            plans_user_initiated: '提案した予定',
            plans_user_invite: '招待された予定',
          },
          button : {
            full_view: '15分ビュー',
            select: '選択',
            find_timing: 'タイミングを見つける',
            suggest_timing: 'イベント予定日を提案',
          },
          book_page: {
            right_timing: 'タイミングを見つける',
            time_slots_that_work: '全員参加可能なタイミングを見つける',
            date_from: 'いつから',
            date_to: 'いつまで',
            duration: '期間',
            back: '戻る',
          },
          meeting_dates_page: {
            category: 'カテゴリ',
            all_categories: '全てのカテゴリ',
            weekday_morning: '平日の午前',
            weekday_afternoon: '平日の午後',
            weekday_lunch: '平日のランチ',
            weekday_evening: '平日の夜',
            weekend_morning: '週末の午前',
            weekend_afternoon: '週末の午後',
            weekend_lunch: '週末のランチ',
            weekend_evening: '週末の夜',
            select_this_date: 'この時間帯を選択して、参加者に招待状を送信します。',
            deets: '予定詳細',
            add_deets: '予定の詳細を記入しましょう',
            title: 'タイトル',
            about: '内容',
          },
          confirmed_meeting_view: {
            date: '日付',
            time: '時間',
            coming: '参加者',
            RSVP_status: '回答状況',
            RSVP: '現在の回答',
            going: '参加',
            not_going: '不参加',
            do_not_know: '未定',
            about: '予定の詳細',
          },
          my_account: {
            intro: 'ここではプロフィールの写真、言語や通知、スケジュールの公開などを設定できます。'
          },
          side_menu: {
            my_age: 'マイページ',
            availability: '候補日程・日時',
            my_contacts: 'お友達リスト',
            plans_initiated: '提案した予定',
            plans_invited: '提案された予定',
            notifications: '通知',
            sign_out: 'サインアウト',
          },
          my_availability: {
            availability: '勤務時間や決まって空いている時間帯などはまとめてインプット。Google カレンダーをインポートするとダブルブッキングする心配もありません。',
          },
          my_contacts_page: {
            contacts: 'タイミングを見つけたいお友達を招待して繋がりましょう。年に１回、月に３回など、見つけたいタイミングの数も設定できます。ストーリーを編集して大切な思い出も保管します。' 
          },
          plans_initiated_page: {
            plans: 'ここでは「予定を作成」、「タイミングを見つける」そして決まった予定を書き写すまでの一定の操作が行えます。'
          },
          plans_invited_page: {
            plans: 'ここでは「招待された予定」が確認できます。回答をして、確定した予定はきちんと書き写しましょう。'
          },
          recent_activity_page: {
            activity: 'ここでは追加されたお友達の確認や、予定を作成したりなどができます。'
          },
          form: {
            signup: {
              usernameTitle: 'ユーザー名',
              longUsername: 'ユーザー名は10文字未満である必要があります',
              shortUsername: 'ユーザー名は3文字以上である必要があります',
              confirmPassword: 'パスワードをもう一度',
              matchingPassword: 'パスワードが一致する必要があります',
              firstName: 'ファーストネーム',
              lastName: '苗字',
              confirmPassword: 'パスワードを認証する',
              google: 'Googleに登録する',
            },
            emailTitle: 'Eメールアドレス',
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
            register: 'アカウントを作成する',
            logout: 'サインアウト'
          },
          footer: {
            privacy: 'プライバシー通知',
            terms: '利用規約',
            dimesInc: '© 2021 Dimes 株式会社'
          }
        }
      },
      cn: {
        translation: {
          landing: {
            tagline: '人跟人很難找出雙方有空的時間來連結',
            description: '透過Dimes的AI雲端服務來幫你找到最佳見面的時機',
            beta: '請點擊下面的按鈕來註冊成為早期BETA用戶',
            button: '有興趣成為早期BETA用戶',
            routine: '設定例行時間表',
            schedule: '週二晚上都很忙而周日早上很閒? 設置一個讓大家可以約的例行時間表',
            import_existing: '連接已訂的時間約定',
            google: '我們可支援Google Calendar來同步你的時程以避免時間衝突',
            connect_contacts: '將好友加入聯絡人',
            share_connect: '分享自己的連結來連接你的好友',
            create_plan: '設定新的活動',
            sit_back: '交給Dimes來幫您們找出最適合的時間段',
            perfect_timing: '與你生命中最重要的人們定期保持聯繫',
            meeting_people: '人生最重要的不是累積財富，而是享受跟朋友家人間互動的美好時光',
            let_dimes: 'Dimes不僅提供一種更輕鬆地創建活動的方式外，更希望透過深層學習而增進人際間的潛在互動而創造出社交價值。',
            ceo: '創始人兼首席執行官　魏嘉宏',
          },
          registration: {
            create_an_account: '新建Dimes帳號',
            already_have_an_account: '已經有Dimes帳號？　登入',
            terms_and_conditions: '簽署即表示您同意使用條款和隱私聲明。',
          },
          signin: {
            sign_in: '登入',
            do_not_have_account: '還沒有Dimes帳號？　創建帳號',
            forgot_password: '忘記密碼了嗎？',
            remember_me: '記住帳號密碼',
          },
          main_page: {
            my_availability: '我的例行時間表',
            welcome: '歡迎',
            contact_invite: '朋友邀請連結',
            hourly_view: '1小時',
            daytime_view: '9點到23點',
            clear_calendar: '全部清除',
            make_a_plan: '創建活動',
            MON: '周一',
            TUE: '周二',
            WED: '周三',
            THU: '周四',
            FRI: '周五',
            SAT: '周六',
            SUN: '周日',
            sync_with_google: '跟Google Calendar做連結',
            contacts: '朋友圈',
            plans_user_initiated: '我主辦的活動',
            plans_user_invite: '我被邀請的活動',
          },
          button : {
            full_view: '15分',
            select: '選擇',
            find_timing: '寻找时机',
            suggest_timing: '發送活動邀請',
          },
          book_page: {
            right_timing: '取得活動的最佳時間段',
            time_slots_that_work: '幫您找到所有人都有空的時間段',
            date_from: '從',
            date_to: '到',
            duration: '需時',
            back: '退到上一步',
          },
          meeting_dates_page: {
            category: '類別',
            all_categories: '所有類別',
            weekday_morning: '非周末的早上',
            weekday_afternoon: '非周末的下午',
            weekday_lunch: '非周末的中餐時間',
            weekday_evening: '非周末的晚上',
            weekend_morning: '周末的早上',
            weekend_afternoon: '周末的下午',
            weekend_lunch: '周末的中餐時間',
            weekend_evening: '周末的晚上',
            select_this_date: '選擇此時段，然後向您的與會者發送邀請。',
            deets: '詳細活動訊息',
            add_deets: '請在發送活動邀請前輸入活動標題及內容後讓與會者了解目的。',
            title: '活動標題',
            about: '活動內容',
          },
          confirmed_meeting_view: {
            date: '活動日期',
            time: '活動時間',
            coming: '參加者',
            RSVP_status: '回答情況',
            RSVP: '目前',
            going: '可以參加',
            not_going: '不能參加',
            do_not_know: '未定',
            about: '活動概要',
          },
          my_account: {
            intro: '更新個人偏好設定'
          },
          side_menu: {
            my_page: '我的主頁',
            availability: '我的行程',
            my_contacts: '我的好友',
            plans_initiated: '我主辦的活動邀請',
            plans_invited: '被邀請的活動清單',
            notifications: '通知',
            sign_out: '登出',
          },
          my_availability: {
            availability: '這裡可以設定你的行程表, 你也可以連結Google Calendar來同步已避免時間衝突',
          },
          my_contacts_page: {
            contacts: '新增你想要定期聯繫的好友, 無論是一年一次, 或是一月三次, 可以設定見面的頻率及方式, 解決你們每次調整時間的不便, 並在這裡留下你們友誼的足跡' 
          },
          plans_initiated_page: {
            plans: '你可以找到你跟你好友之間最適合的時間來設定新的活動邀請, 別忘了把這邊的邀請記錄到你平常用的行事曆裡'
          },
          plans_invited_page: {
            plans: '這邊有你收到的活動邀情, 請回復你可否參加, 也提醒你別忘了寫到平常用的行事曆裡'
          },
          recent_activity_page: {
            activity: '一些你需要知道的信息'
          },
          form: {
            signup: {
              usernameTitle: '用户名',
              longUsername: '用户名必须少于 10 个字符',
              shortUsername: '用户名必须至少为 3 个字符',
              confirmPassword: '确认密码',
              matchingPassword: '密码必须匹配',
              firstName: '名',
              lastName: '姓',
              confirmPassword: '确认密码',
              google: '在谷歌注册'
            },
            emailTitle: '电子邮件',
            invalidEmail: '无效的邮件地址',
            longEmail: '电子邮件不得超过 25 个字符',
            longPassword: '密码必须至少8个字符',
            passwordTitle: '密码', 
            required: '必需的',
            hide: '隐藏',
            show: '表演',
          },
          header: {
            signin: '登入',
            register: '登记',
            logout: '登出'
          },
          footer: {
            privacy: '隱私聲明',
            terms: '使用條款',
            dimesInc: '© 2021 Dimes株式会社'
          }
        }
      }
    }
  });

export default i18n;
