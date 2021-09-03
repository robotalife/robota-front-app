import {UserRole} from "../utils/auth.roles";

export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const adminRoot = '/app';
export const searchPath = `${adminRoot}/#`


export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'en'
export const defaultDirection = 'ltr'
export const localeOptions = [
    {id: 'en', name: 'English LTR', direction: 'ltr'},
    {id: 'es', name: 'Español', direction: 'ltr'},
    {id: 'enrtl', name: 'English RTL', direction: 'rtl'}
]

export const firebaseConfig = {
    apiKey: "AIzaSyDe94G7L-3soXVSpVbsYlB5DfYH2L91aTU",
    authDomain: "piaf-vue-login.firebaseapp.com",
    databaseURL: "https://piaf-vue-login.firebaseio.com",
    projectId: "piaf-vue-login",
    storageBucket: "piaf-vue-login.appspot.com",
    messagingSenderId: "557576321564",
    appId: "1:557576321564:web:bc2ce73477aff5c2197dd9"
};

const publicApiBase = "https://public.robotalife.com/";
const privateApiBase = "https://api.robotalife.com/";
const publicApiVersion = "/v2";

export const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";
export const gConfig =
    {
        PUBLIC_API_URL: publicApiBase + stage + publicApiVersion,
        PRIVATE_API_URL: privateApiBase + stage
    }

export const currentUser = {
    id: 1,
    title: 'Sarah Kortney',
    img: '/assets/img/profiles/l-1.jpg',
    date: 'Last seen today 15:24',
    role: UserRole.Admin
}

export const isAuthGuardActive = true;
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.blueolympic'
export const colors = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel']
